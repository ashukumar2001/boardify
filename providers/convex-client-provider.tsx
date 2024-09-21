"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexQueryClient } from "@convex-dev/react-query";
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import Loading from "@/components/auth/loading";
import Landing from "@/components/landing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
interface ConvexClientProviderProps {
  children: React.ReactNode;
}
const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexURL);
const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});
convexQueryClient.connect(queryClient);
export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <QueryClientProvider client={queryClient}>
          <Authenticated>{children}</Authenticated>
          <AuthLoading>
            <Loading />
          </AuthLoading>
          <Unauthenticated>
            <Landing />
          </Unauthenticated>
        </QueryClientProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
