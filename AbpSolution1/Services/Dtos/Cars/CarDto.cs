using Volo.Abp.Application.Dtos;

namespace AbpSolution1.Services.Dtos.Cars
{
    public class CarDto : AuditedEntityDto<Guid>
    {
        public string Name { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
