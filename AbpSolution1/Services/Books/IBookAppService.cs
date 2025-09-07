using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using AbpSolution1.Services.Dtos.Books;
using AbpSolution1.Entities.Books;

namespace AbpSolution1.Services.Books;

public interface IBookAppService :
    ICrudAppService< //Defines CRUD methods
        BookDto, //Used to show books
        Guid, //Primary key of the book entity
        PagedAndSortedResultRequestDto, //Used for paging/sorting
        CreateUpdateBookDto> //Used to create/update a book
{

}