import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/governors", "GovernorsController.find");
    Route.get("/governors/:id", "GovernorsController.find");
    Route.post("/governors", "GovernorsController.create");
    Route.put("/governors/:id", "GovernorsController.update");
    Route.delete("/governors/:id", "GovernorsController.delete");
})