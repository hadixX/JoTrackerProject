using Volo.Abp.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace AbpSolution1.Data;

public class AbpSolution1DbSchemaMigrator : ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public AbpSolution1DbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        
        /* We intentionally resolving the AbpSolution1DbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<AbpSolution1DbContext>()
            .Database
            .MigrateAsync();

    }
}
