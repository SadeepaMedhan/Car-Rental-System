package lk.easycar.service.impl;

import lk.easycar.dto.VehicleDTO;
import lk.easycar.entity.Vehicle;
import lk.easycar.repo.VehicleRepo;
import lk.easycar.service.VehicleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepo vehicleRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveVehicle(VehicleDTO dto) {

        if (!vehicleRepo.existsById(dto.getVehicleId())){
            vehicleRepo.save(mapper.map(dto, Vehicle.class));
        }else{
            throw new RuntimeException("Vehicle Already Exist!");
        }
    }

    @Override
    public void deleteVehicle(String id) {
        if (vehicleRepo.existsById(id)){
            vehicleRepo.deleteById(id);
        }else{
            throw new RuntimeException("Please check the Vehicle ID, Not Found Vehicle!");
        }
    }

    @Override
    public void updateVehicle(VehicleDTO dto) {
        System.out.println(dto);
        if (vehicleRepo.existsById(dto.getVehicleId())){
            System.out.println(mapper.map(dto, Vehicle.class));
            vehicleRepo.save(mapper.map(dto, Vehicle.class));
        }else{
            throw new RuntimeException("No Such Vehicle To Update..! Please Check the ID..!");
        }
    }

    @Override
    public VehicleDTO searchVehicle(String id) {
        if (vehicleRepo.existsById(id)){
            return mapper.map(vehicleRepo.findById(id).get(), VehicleDTO.class);
        }else{
            throw new RuntimeException("No Vehicle For "+id+" !");
        }
    }

    @Override
    public List<VehicleDTO> getAllVehicles() {
        List<Vehicle> vehicleList = vehicleRepo.findAll();

        for (Vehicle vehicle : vehicleList) {
            if (vehicle.getMaintenanceMileage()>=5000) {
                vehicle.setStatus("Maintenance");
            }
        }

        return mapper.map(vehicleList,
                new TypeToken<List<VehicleDTO>>(){}.getType());
    }

    @Override
    public String getNewVehicleID() {
        Vehicle lastVehicle = vehicleRepo.getLastVehicle();
        //System.out.println(lastVehicle);
        if (lastVehicle!=null){
            int tempId = Integer.parseInt(lastVehicle.getVehicleId().split("V")[1]);
            tempId = tempId+1;
            if(tempId <= 9){return "V00"+tempId;}
            else if(tempId <= 99){return "V0"+tempId;}
            else {return "V"+tempId;}
        }else{return "V001";}
    }


}
