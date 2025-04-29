import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/insurances", "InsurancesController.find");
    Route.get("/insurances/:id", "InsurancesController.find");
    Route.post("/insurances", "InsurancesController.create");
    Route.put("/insurances/:id", "InsurancesController.update");
    Route.delete("/insurances/:id", "InsurancesController.delete");
})