import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext)
export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

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
            termsConditions
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

            setSession(signUpData);
            return { success:  true, message:"successfully registered as partner"}

        } catch (err){
            console.error(err)
        }

    }

    const signUp = async ( registerData ) => {
        const { fullname, email, password, user_type } = registerData;
   
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
                fullname,
                user_type
            }).single();
        
            if(insertError){
                return { error: "Error occured while signing up: ", signUpError}
            };
          
            setSession(signUpData);
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
            setSession(undefined);
            return { message: "signed out"}
       } 
        catch (err) {
            console.error(err);
        }
    }

 

    const signIn = async (user) => {
        const { email, password } = user; 
        try{
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if(error){
                return { error: `Error occured while signing in ${error}`}
            }
            setSession(data)
             return { message: "successfully signin"}
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
    }


    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}