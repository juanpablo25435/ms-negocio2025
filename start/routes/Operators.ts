import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/operators", "OperatorsController.find");
    Route.get("/operators/:id", "OperatorsController.find");
    Route.post("/operators", "OperatorsController.create");
    Route.put("/operators/:id", "OperatorsController.update");
    Route.delete("/operators/:id", "OperatorsController.delete");
})