using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace AbpSolution1.Data;

public class AbpSolution1DbContextFactory : IDesignTimeDbContextFactory<AbpSolution1DbContext>
{
    public AbpSolution1DbContext CreateDbContext(string[] args)
    {
        AbpSolution1EfCoreEntityExtensionMappings.Configure();
        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<AbpSolution1DbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));

        return new AbpSolution1DbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}