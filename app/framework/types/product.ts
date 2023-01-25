export type Product = {
    id: string
    title: string
    vendor: string
    handle: string
    images: Image[]
}


export type Image = {
    url: string
    altText: string
    width: number
    height: number
}

export type ProductResponseProduct = Product & {
    images: {
        edges: {
            node: Image
        }[]
    }
}

export type ProductResponse = {
    products: {
        edges: {
            node: ProductResponseProduct
        }[]
    }
}