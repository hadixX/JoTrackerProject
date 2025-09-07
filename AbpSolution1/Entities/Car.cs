using Volo.Abp.Domain.Entities;

namespace AbpSolution1.Entities
{
    public class Car : BasicAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }

    }
}
