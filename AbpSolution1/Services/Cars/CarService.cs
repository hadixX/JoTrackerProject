using AbpSolution1.Entities;
using AbpSolution1.Entities.Books;
using AbpSolution1.Permissions;
using AbpSolution1.Services.Dtos.Books;
using AbpSolution1.Services.Dtos.Cars;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;

namespace AbpSolution1.Services.Cars
{
    public class CarService(IRepository<Car, Guid> carRepository) : ApplicationService, ICarService
    {
        public async Task<List<CarDto>> GetListAsync()
        {
            var cars = await carRepository.GetListAsync();
            return [.. cars.Select(c => new CarDto
            {
                Id = c.Id,
                Name = c.Name,
                Latitude = c.Latitude,
                Longitude = c.Longitude
            })];
        }

        public async Task DeleteAsync(Guid id)
        {
            await carRepository.DeleteAsync(id);
        }


        public async Task<CarDto> CreateAsync(CarDto input)
        {
            var car = ObjectMapper.Map<CarDto, Car>(input);
            await carRepository.InsertAsync(car);
            return ObjectMapper.Map<Car, CarDto>(car);
        }

    }
}
