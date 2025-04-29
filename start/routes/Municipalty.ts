import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/municipalties", "MunicipaltiesController.find");
    Route.get("/municipalties/:id", "MunicipaltiesController.find");
    Route.post("/municipalties", "MunicipaltiesController.create");
    Route.put("/municipalties/:id", "MunicipaltiesController.update");
    Route.delete("/municipalties/:id", "MunicipaltiesController.delete");
})