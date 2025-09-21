"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";

export default function LoginPage() {
    const handleLogin = (provider: string) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
            <Card className="w-96 shadow-lg">
                <CardContent className="p-8 text-center">
                    <h1 className="text-blue-950 text-2xl font-mono mb-6">Welcome to SideQuest</h1>
                    <p className="text-gray-500 font-mono mb-6">Sign In</p>

                    <div className="space-y-4">
                        <Button
                            onClick={() => handleLogin("google")}
                            className="font-sans w-full flex items-center gap-3 bg-white hover:bg-gray-200 text-black border-2 border-gray-100"
                        >
                            <FcGoogle size={18} />
                            Login with Google
                        </Button>

                        <Button
                            onClick={() => handleLogin("github")}
                            className="font-sans w-full flex items-center gap-3 bg-gray-900 hover:bg-black text-white"
                        >
                            <FaGithub size={18} />
                            Login with GitHub
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

