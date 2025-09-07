using Volo.Abp.Application.Services;
using AbpSolution1.Localization;

namespace AbpSolution1.Services;

/* Inherit your application services from this class. */
public abstract class AbpSolution1AppService : ApplicationService
{
    protected AbpSolution1AppService()
    {
        LocalizationResource = typeof(AbpSolution1Resource);
    }
}