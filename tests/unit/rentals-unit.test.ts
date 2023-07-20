import rentalsRepository from "../../src/repositories/rentals-repository"
import rentalsService from "../../src/services/rentals-service"

describe("GET /rentals unit", () => {
  it("OK", async() => {
    jest.spyOn(rentalsRepository,"getRentals").mockResolvedValueOnce([
      {id:1,date: new Date(),endDate:new Date(),userId:1,closed:false}
    ])
    const result=await rentalsRepository.getRentals()
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id:expect.any(Number),date:expect.any(Date),endDate:expect.any(Date),userId:expect.any(Number),closed:expect.any(Boolean) 
      })
    ]))
  })
})

describe("GET /rentals/:id unit", () => {
  it("OK - rental found", async() => {
    jest.spyOn(rentalsRepository,"getRentalById").mockResolvedValueOnce({
      id:1,date: new Date(),endDate:new Date(),userId:1,closed:false,movies:[]
    })
    const result=await rentalsService.getRentalById(1)
    expect(result).toEqual(expect.objectContaining({
        id:expect.any(Number),date:expect.any(Date),endDate:expect.any(Date),userId:expect.any(Number),closed:expect.any(Boolean),movies:expect.any(Array) 
      })
    )
  })

  it("BAD - rental not found", async() => {
    jest.spyOn(rentalsRepository,"getRentalById").mockResolvedValueOnce(undefined)
    const result=rentalsService.getRentalById(55)
    expect(result).rejects.toEqual({
      name: "NotFoundError",
      message:"Rental not found."
    })
  })

})