using Microsoft.AspNetCore.Cors;
using Supabase;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000",
                                             "http://yankan.vercel.app");
                          policy.AllowAnyHeader();
                          policy.AllowCredentials();
                          policy.AllowAnyMethod();
                      });
});

builder.Services.AddControllers().AddNewtonsoftJson();

builder.Services.AddScoped<Supabase.Client>(_ =>
    new Supabase.Client(
        builder.Configuration["SUPABASE_URL"],
        builder.Configuration["SUPABASE_KEY"],
        new SupabaseOptions
        {
            AutoRefreshToken = true,
            AutoConnectRealtime = true
        }));

var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
