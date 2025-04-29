import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/policies", "PoliciesController.find");
    Route.get("/policies/:id", "PoliciesController.find");
    Route.post("/policies", "PoliciesController.create");
    Route.put("/policies/:id", "PoliciesController.update");
    Route.delete("/policies/:id", "PoliciesController.delete");
})