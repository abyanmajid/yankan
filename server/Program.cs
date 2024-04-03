using Supabase;
using Supabase.Interfaces;
using yankan.Models;
using yankan.Requests;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
/**/
/* app.MapPost("/boards", async ( */
/*       CreateBoardRequest request, */
/*       Supabase.Client supabase) => */
/*     { */
/*       var board = new Board { */
/*         Name = request.Name, */
/*         Members = request.Members, */
/*         Tasks = request.Tasks, */
/*       }; */
/**/
/*       var response = await supabase.From<Board>().Insert(board); */
/*       var newBoard = response.Models.First(); */
/*       return Results.Ok(newBoard.Id); */
/*     } */
/* ); */

app.Run();

// "/": Hello, World!
// "/board": Get all boards (GET)
// "/board": Create a new board (POST)
// "/board/<id>": Get board by id (GET)
// "/board/<id>": Update board by id (PUT)
// "/board/<id>": Delete board by id (DELETE)
// "/tasks/":
