import { config } from "..";
import { ProductResponseProduct } from "../types/product";

const getProductQuery = `
    query (
        $handle: String!
    ) {
        product(handle: $handle) {
            id
            title
            vendor
            description
            images(first: 10) {
                edges {
                    node {
                        url
                        altText
                        width
                        height
                    }
                }
            }
        }
    }
`


export default async function getProduct(handle: string) {
    try {
        const { data } = await config.fetch<{ product: ProductResponseProduct} >(getProductQuery, { variables: { handle }})
        const product = {
            ...data.product,
            images: data.product.images.edges.map(({ node }) => ({ ...node}))
        }
        return product;
    } catch(e) {
        throw new Error("Error getting product")
    }
}