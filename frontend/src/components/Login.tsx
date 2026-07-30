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
import {FcGoogle} from "react-icons/fc";

interface LoginData {
    email: string,
    pwd: string
}

const initLoginData: LoginData = {
    email: "",
    pwd: "",
}


type LoginDataErrors = Partial<Record<keyof LoginData, string>>
const initLoginDataErrors: LoginDataErrors = {}

const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

export default function Login() {
    const auth = useAuth()
    const navigate = useNavigate()
    const [logindata, setLoginData] = useState<LoginData>(initLoginData)
    const [errors, setErrors] = useState<LoginDataErrors>(initLoginDataErrors)

    function update<K extends keyof LoginData>(k: K, v: LoginData[K]) {
        setLoginData(
            (prev) => (
                {...prev, [k]: v}
            )
        )
    }

    function validate(loginData: LoginData) {
        const nextErrors: LoginDataErrors = {}

        for (const [k, v] of Object.entries(loginData)) {
            if (!v) {
                nextErrors[k as keyof LoginData] = "This field is required"
            }
        }
        if (loginData.email && !emailRegex.test(loginData.email)) {
            nextErrors.email = "Invalid email address";
        }
        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    async function loginHandler(loginData: LoginData) {
        if (!validate(loginData)) return
        try {
            await auth.login(loginData.email, loginData.pwd)
            navigate("/dashboard")
        } catch (err) {
            if (err instanceof Error) {
                toaster.create({
                    title: "Login failed",
                    description: err.message,
                    type: "error",
                });
            }
        }
    }

    return (
        <Card.Root variant="elevated" size="md" w="100%" maxW="600px">
            <Card.Header alignItems="center">
                <Card.Title textStyle="heading.large">
                    Welcome
                </Card.Title>
                <Card.Description>
                    Great to see you! Please enter your account details.
                </Card.Description>
            </Card.Header>

            <Card.Body pt="40px">
                <VStack gap="24px" align="stretch">
                    <Field.Root required invalid={!!errors.email}>
                        <Input placeholder="Email" variant="outline" size="md"
                               value={logindata.email} onChange={(e) => (update("email", e.target.value))}/>
                        <Field.ErrorText>{errors.email}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root required invalid={!!errors.pwd}>
                        <PasswordInput placeholder="Password" variant="outline" size="md"
                                       value={logindata.pwd} onChange={(e) => (update("pwd", e.target.value))}/>
                        <Field.ErrorText>{errors.pwd}</Field.ErrorText>
                    </Field.Root>

                    <Button variant="action" onClick={() => (loginHandler(logindata))}> Login </Button>
                    <Button onClick={auth.signUpWithGoogle} variant="outline" w="full">
                        <FcGoogle/> Continue with Google
                    </Button>
                </VStack>
            </Card.Body>

            <Card.Footer justifyContent="center">
                <Text textStyle="body.sm.footer">
                    Don't have an account?
                    <Text textDecoration="underline" asChild>
                        <RouterLink to="/register"> Sign Up</RouterLink>
                    </Text>
                </Text>
            </Card.Footer>
        </Card.Root>
    )
}