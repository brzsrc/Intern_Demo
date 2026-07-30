import {useAuth} from "../contexts/AuthContext";
import React, {useState} from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import {Toaster, toaster} from "./ui/toaster";
import {Link as RouterLink} from "react-router-dom";
import {

    Button,
    Card,
    Flex,
    Field,
    Text,
    Link,
    Input, VStack,
} from "@chakra-ui/react"
import {PasswordInput} from "./ui/password-input";
import {useNavigate} from "react-router-dom";
import {isValidPhoneNumber} from "libphonenumber-js";
import {FcGoogle} from "react-icons/fc";

interface SignupData {
    fullName: string,
    email: string,
    pwd: string,
    phoneNumber: string,
    dateOfBirth: string,

}

const initSignupData: SignupData = {
    fullName: "",
    email: "",
    pwd: "",
    phoneNumber: "",
    dateOfBirth: "",
}

type SignupDataErrors = Partial<Record<keyof SignupData, string>>
const initSignupDataErrors: SignupDataErrors = {}

const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

const isAtLeast18 = (dob: string) => {
    const birth = new Date(dob);
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - 18);
    return birth <= cutoff;
};

export default function Register() {
    const auth = useAuth()
    const navigate = useNavigate()
    const [signupData, setSignupData] = useState<SignupData>(initSignupData)
    const [errors, setErrors] = useState<SignupDataErrors>(initSignupDataErrors)

    function update<K extends keyof SignupData>(k: K, v: SignupData[K]) {
        setSignupData(
            (prev) => (
                {...prev, [k]: v}
            )
        )
    }

    function validate(signupData: SignupData) {
        const nextErrors: SignupDataErrors = {}

        for (const [k, v] of Object.entries(signupData)) {
            if (!v) {
                nextErrors[k as keyof SignupData] = "This field is required"
            }
        }
        if (signupData.email && !emailRegex.test(signupData.email)) {
            nextErrors.email = "Invalid email address";
        }

        if (signupData.phoneNumber && !isValidPhoneNumber(signupData.phoneNumber, "NL")) {
            nextErrors.phoneNumber = "Invalid phone number";
        }

        if (signupData.dateOfBirth && !isAtLeast18(signupData.dateOfBirth)) {
            nextErrors.dateOfBirth = "Your age must be at least 18";
        }

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }


    async function signupHandler(signupData: SignupData) {
        if (!validate(signupData)) return
        try {
            await auth.signup(signupData.fullName, signupData.email, signupData.pwd)
            // navigate("/dashboard")
        } catch (err) {
            if (err instanceof Error) {
                toaster.create({
                    title: "Signup failed",
                    description: err.message,
                    type: "error",
                });
            }
        }
    }

    return (
            <Card.Root variant="elevated" size="md" w="100%" maxW="608px">
                <Card.Header alignItems="center">
                    <Card.Title textStyle="heading.large">
                        Sign up!
                    </Card.Title>
                    <Card.Description>
                        Register to our service to be able to invite clients!
                    </Card.Description>
                </Card.Header>

                <Card.Body pt="40px">
                    <VStack gap="24px" align="stretch">
                        <Field.Root required invalid={!!errors.fullName}>
                            <Input placeholder="Full Name" variant="outline" size="md"
                            value={signupData.fullName} onChange={(e) => (update("fullName", e.target.value))}/>
                            <Field.ErrorText>{errors.fullName}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root required invalid={!!errors.email}>
                            <Input placeholder="Email" variant="outline" size="md"
                            value={signupData.email} onChange={(e) => (update("email", e.target.value))}/>
                            <Field.ErrorText>{errors.email}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root required invalid={!!errors.pwd}>
                            <Input placeholder="Password" variant="outline" size="md"
                            value={signupData.pwd} onChange={(e) => (update("pwd", e.target.value))}/>
                            <Field.ErrorText>{errors.pwd}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root required invalid={!!errors.phoneNumber}>
                            <Input placeholder="Phone Number" variant="outline" size="md"
                            value={signupData.phoneNumber} onChange={(e) => (update("phoneNumber", e.target.value))}/>
                            <Field.ErrorText>{errors.phoneNumber}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root required invalid={!!errors.dateOfBirth}>
                            <Input placeholder="Date Of Birth" variant="outline" size="md"
                            value={signupData.dateOfBirth} onChange={(e) => (update("dateOfBirth", e.target.value))}/>
                            <Field.ErrorText>{errors.dateOfBirth}</Field.ErrorText>
                        </Field.Root>

                        <Button variant="action" onClick={() => (signupHandler(signupData))}> Register </Button>
                        <Button onClick={auth.signUpWithGoogle} variant="outline" w="full">
                            <FcGoogle/> Continue with Google
                        </Button>
                    </VStack>
                </Card.Body>

                <Card.Footer justifyContent="center">
                    <Text textStyle="body.sm.footer">
                        Already have an account?
                        <Text textDecoration="underline" asChild>
                            <RouterLink to="/login"> Log In</RouterLink>
                        </Text>
                    </Text>
                </Card.Footer>
            </Card.Root>


    )


}