package lk.easycar.controller;

import lk.easycar.dto.VehicleDTO;
import lk.easycar.service.VehicleService;
import lk.easycar.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("vehicle")
@CrossOrigin
public class VehicleController {

    @Autowired
    VehicleService vehicleService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllVehicles(){
        return new ResponseUtil(200, "Ok",vehicleService.getAllVehicles());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveVehicle(@ModelAttribute VehicleDTO vehicle){
        vehicleService.saveVehicle(vehicle);
        return new ResponseUtil(200,"Save",null);
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateVehicle(@RequestBody VehicleDTO vehicle) {
        vehicleService.updateVehicle(vehicle);
        return new ResponseUtil(200,"Updated",null);
    }

    @DeleteMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteVehicle(@RequestParam String id) {
        vehicleService.deleteVehicle(id);
        return new ResponseUtil(200,"Deleted",null);
    }

    @GetMapping(path = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchVehicle(@PathVariable String id) {
        return new ResponseUtil(200,"Ok",vehicleService.searchVehicle(id));
    }
}
