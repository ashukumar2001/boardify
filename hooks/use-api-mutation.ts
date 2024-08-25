import { extractErrorMessage } from "@/lib/extract-error";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import type { FunctionReference } from "convex/server";
export const useApiMutation = <T extends FunctionReference<"mutation", "public">>(mutationFunction: T) => {
    const mutation = useConvexMutation(mutationFunction);
    type VariablesType = Parameters<ReturnType<typeof useConvexMutation<T>>>[0];
    return useMutation({
        mutationFn: async (variables: VariablesType) => {
            try {
                return await mutation(variables);
            } catch (error: any) {
                throw new Error(extractErrorMessage(error.message));
            }
        }
    });
};