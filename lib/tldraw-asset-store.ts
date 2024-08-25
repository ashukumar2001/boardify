import { getPresignedURL } from "@/actions/upload-media";
import axios from "axios";
import { TLAssetStore } from "tldraw";

const assetStore: TLAssetStore =
{
    async upload(asset, file) {
        const [data, error] = await getPresignedURL({ type: file.type, size: file.size });
        if (data) {
            const { preSignedURL, imageURL } = data;
            await axios.put(preSignedURL, file, {
                headers: {
                    "Content-Type": file.type,
                }
            })
            return imageURL;
        }
        if (error) {
            throw new Error(error.message);
        }
        return "";
    },
    resolve(asset, ctx) {
        return asset.props.src;
    },

}

export default assetStore;