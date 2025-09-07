using AutoMapper;
using AbpSolution1.Entities.Books;
using AbpSolution1.Services.Dtos.Books;
using AbpSolution1.Entities;
using AbpSolution1.Services.Dtos.Cars;

namespace AbpSolution1.ObjectMapping;

public class AbpSolution1AutoMapperProfile : Profile
{
    public AbpSolution1AutoMapperProfile()
    {
        CreateMap<Book, BookDto>();
        CreateMap<CreateUpdateBookDto, Book>();
        CreateMap<BookDto, CreateUpdateBookDto>();
        CreateMap<Car, CarDto>().ReverseMap();
        /* Create your AutoMapper object mappings here */
    }
}