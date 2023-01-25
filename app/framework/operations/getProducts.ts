import { config } from "..";
import { Product, ProductResponse } from "../types/product";

const getProductsQuery = `
    query (
        $first: Int = 250
        $query: String = ""
    ) {
        products (
            first: $first
            query: $query
        ) {
            edges {
                node {
                    id
                    title
                    vendor
                    handle
                    images(first: 1){
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
        }
    }
`


type GetProductArgs = {
    handle?: string
    first?: number
}
export default async function getProducts(args: GetProductArgs = {}): Promise<Product[]>{
    const { data } = await config.fetch<ProductResponse>(getProductsQuery, { variables: args })
    const products = data.products.edges.map(({ node }) => ({
        ...node,
        images: node.images.edges.map(({ node }) => ({ ...node}))
    }))
    return products
}