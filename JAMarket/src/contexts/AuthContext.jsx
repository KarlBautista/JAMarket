import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext)
export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

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
    signOut
    }


    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}