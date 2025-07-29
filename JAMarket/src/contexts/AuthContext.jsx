import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext)
export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);
    const [partnerData, setPartnerData] = useState(null);
    const [customerData, setCustomerData] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setSession(session);
                
               
                const { data: userData, error: usersError } = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", session.user.id)
                    .single();

                if (userData && !usersError) {
                    if (userData.user_type === "STORE OWNER") {
                        const { data: userPartnerData, error: partnerError } = await supabase
                            .from("partners")
                            .select("*")
                            .eq("id", session.user.id)
                            .single();

                        if (userPartnerData && !partnerError) {
                            setPartnerData(userPartnerData);
                        }
                    } else {
                        setCustomerData(userData);
                    }
                }
            }
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription}} = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if(event === "SIGNED_OUT"){
                    setSession(null);
                    setPartnerData(null);
                    setCustomerData(null);
                }
            }
        )
        return () => subscription.unsubscribe();
    }, []);
   

    const handeJoinWithUs = async ( userData ) => {
        console.log(userData)
        const {
            firstName,
            lastName,
            storeName,
            email,
            phoneNumber,
            password,
            confirmPassword,
            aboutProductsServices,
            logo,
            termsConditions,
            user_type,
        } = userData;

        if(password !== confirmPassword){
            return { success: false, error: "Password do not match"}
        };
        if(!termsConditions){
            return { success: false, error: "You must accept the terms and conditions."}
        }

        try{
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email,
                password
            });

            if(signUpError){
                return { success: false, error: "An error occured while signing up" }
            }
            
            const userId = signUpData.user.id;

            //dito mag uupload ng images
            let logoUrl = "";
            if(logo){
                const { data: storageData, error: storageError } = await supabase.storage
                .from("partner-logos")
                .upload(`logos/${Date.now()}_${logo.name}`, logo);

                if(storageError){
                    return { success: false, error: `Logo upload failed: ${storageError.message}`}
                }

                const { data: publicUrlData } = await supabase
                .storage
                .from("partner-logos")
                .getPublicUrl(storageData.path);

                logoUrl = publicUrlData.publicUrl;
            }

            //3 dito naman pag insert ng mga informations ng partners
            const { error: insertError } = await supabase.from("partners")
            .insert({
                id: userId,
                first_name: firstName,
                last_name: lastName,
                store_name: storeName,
                phone: phoneNumber,
                about: aboutProductsServices,
                logo_url: logoUrl,
                email,
            });

            if(insertError){
                return { success: false, error: `Insert error: ${insertError.message}`}
            }

            const { error: insertUsersError } = await supabase.from("users")
            .insert({
                id: userId,
                first_name: firstName,
                last_name: lastName,
                email,
                phone: phoneNumber,
                user_type, 
            });

            if(insertUsersError){
                return { success: false, error: insertUsersError.message}
            }


            setSession(signUpData);
            return { success:  true, message:"successfully registered as partner"}

        } catch (err){
            console.error(err)
        }

    }

    const signUp = async ( registerData ) => {
        const { firstName, lastName, email, phoneNumber, password, user_type } = registerData;
   
        try{
            const { data: signUpData , error: signUpError } = await supabase.auth.signUp({
                email,
                password
            });
            if(signUpError){
                return { error: "Error occured while signing up: ", signUpError}
            }

            const user = signUpData.user;

            const { error: insertError } = await supabase.from("users")
            .insert({
                id: user.id,
                email,
                first_name: firstName,
                last_name: lastName,
                phone: phoneNumber,
                user_type,
            }).single();
        
            if(insertError){
                return { error: "Error occured while signing up: ", signUpError}
            };
          
            setSession(signUpData);
            const { data, error } = await supabase.auth.getUser();
            if(error){
                return { error: error };
            } 
            const userId = data.user.id;
            const { data: signedUpData, error: signedUpError } = await supabase.from("users")
            .select("*").eq("id", userId).single();
            if(signedUpError){
                return { error: signedUpError };
            }
            setCustomerData(signedUpData);
            return { message: "Successfullly registered user"}
        }
        catch(err) {
            console.error(err)
        }
    }

    const signOut = async () => {
       try{
            const { error } = await supabase.auth.signOut();
            if(error) {
                return { error: `Error occured while signing out: ${error}`}
            }
         
            setSession(null);
            setPartnerData(null);
            setCustomerData(null);
            navigate("/");
            return { message: "signed out"}
       } 
        catch (err) {
            console.error(err);
        }
    }

 

    const signIn = async (user) => {
        const { email, password } = user; 
        try{
            const {data: authData , error: authError} = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if(authError){
                return { error: `Error occured while signing in ${authError}`}
            }

            const { data: userData, error: usersError } = await supabase.auth.getUser();
            
            if(usersError){
                return { error: `failed to get data ${usersError.message}`}
            }

            
          const userId = userData.user.id;

            const { data, error } = await supabase.from("users")
            .select("*").eq("id", userId).single();

            if(error){
                  return { error: `failed to get data ${error.message}`}
            }

            if(data.user_type === "STORE OWNER"){
                const { data: userPartnerData, error: partnerError } = await supabase.from("partners")
                .select("*").eq("id", userId).single();

                if(partnerError){
                      return { error: `failed to get partner data ${partnerError.message}`}
                }
                 setSession(authData)
                setPartnerData(userPartnerData);
                return { message: "successfully partner signin"};
            } 

            setSession(authData);
            setCustomerData(data);
             return { message: "successfully customer signin"}
        } catch (err) {
            console.error(err);
        }
    }

  const value = {
    session,
    signUp,
    signIn,
    signOut,
    handeJoinWithUs,
    partnerData,
    customerData
    }


    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}