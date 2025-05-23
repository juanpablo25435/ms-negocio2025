import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/users", "UsersController.find");
    Route.get("/users/:id", "UsersController.find");
    Route.post("/users", "UsersController.create");
    Route.put("/users/:id", "UsersController.update");
    Route.delete("/users/:id", "UsersController.delete");
})