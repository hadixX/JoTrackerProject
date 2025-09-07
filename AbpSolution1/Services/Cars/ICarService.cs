using AbpSolution1.Services.Dtos.Cars;

namespace AbpSolution1.Services.Cars
{
    public interface ICarService
    {
        Task<CarDto> CreateAsync(CarDto input);
        Task DeleteAsync(Guid id);
        Task<List<CarDto>> GetListAsync();
    }
}