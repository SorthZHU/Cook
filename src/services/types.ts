export module ApiServiceResponse {
  export interface getAllFoodsResponse {
    header: any
    body: Array<{
      category: string
      cookware: string
      foodCode: string
      foodId: number
      foodName: string
    }>
  }
} 
