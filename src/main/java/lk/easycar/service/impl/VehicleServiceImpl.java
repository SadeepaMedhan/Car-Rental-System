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
        if (vehicleRepo.existsById(dto.getVehicleId())){
            vehicleRepo.save(mapper.map(dto, Vehicle.class));
        }else{
            throw new RuntimeException("Vehicle Already Exist!");
        }
    }

    @Override
    public void deleteVehicle(String id) {

    }

    @Override
    public void updateVehicle(VehicleDTO dto) {

    }

    @Override
    public VehicleDTO searchVehicle(String id) {
        return null;
    }

    @Override
    public List<VehicleDTO> getAllVehicles() {
        return mapper.map(vehicleRepo.findAll(),
                new TypeToken<List<VehicleDTO>>(){}.getType());
    }
}
