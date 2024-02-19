import { useMutation } from "convex/react";
import type { FunctionArgs, FunctionReference, OptionalRestArgs } from "convex/server";
import { useState } from "react";

export const useApiMutation = <T extends FunctionReference<"mutation", "public">>(mutationFunction: T) => {
    const [pending, setPending] = useState(false);
    const apiMutation = useMutation(mutationFunction);

    const mutate = (args: FunctionArgs<T>) => {
        setPending(true);
        return apiMutation(args).finally(() => setPending(false)).then(result => result).catch(error => { throw error })
    };

    return {
        mutate,
        pending
    };
}; 