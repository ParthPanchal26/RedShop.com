export interface SignUp{
    email: string,
    password: string,
    provider_name: string,
    DOB: string,
    city: string,
    state: string,
    country: string,
    contactNo: string,
    contactNo_2: string
}

export interface login{
    email: string,
    password: string
}

export interface product{
    id: number,
    date: string,
    ImageURL:string,
    category: string,
    price: string,
    name: string,
    description: string,
    color: string,
    quantity: undefined | number,
    productId: undefined | number,
    sellerId: number,
    sellerStore: any,
    sellerName: string,
    sellerNo: number,
    sellerEmail: string,
    baseImg: string,
    baseImgUpdated: string
}

export interface cart{
    id: number | undefined,
    date: string,
    ImageURL:string,
    category: string,
    price: string,
    name: string,
    description: string,
    color: string,
    quantity: undefined | number,
    userId: number,
    productId: number,
    sellerId: number,
    baseImg: string
}

export interface priceSummary{
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number,
    quantity: number,
    items: number
}

export interface order{
    address: any
    email:string,
    FirstName: string,
    LastName: string,
    Pin_Code: string,
    contact_No: string,
    totalPrice: number,
    userId: number,
    sellerId: number,
    id: number | undefined,
    buyerId: number,
    cartData: any,
    orderData: string,
    [key: string]: any,
    Email: string | undefined,
    Contact_No: number | undefined
}