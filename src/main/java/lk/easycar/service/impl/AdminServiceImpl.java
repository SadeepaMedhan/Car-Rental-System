package lk.easycar.service.impl;

import lk.easycar.dto.AdminDTO;
import lk.easycar.entity.Admin;
import lk.easycar.repo.AdminRepo;
import lk.easycar.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveAdmin(AdminDTO dto) {
        if (!repo.existsById(dto.getAdminID())) {
            repo.save(mapper.map(dto, Admin.class));
        } else {
            throw new RuntimeException("Admin Already Exist..!");
        }
    }

    @Override
    public void deleteAdmin(String id) {

    }

    @Override
    public void updateAdmin(AdminDTO dto) {

    }

    @Override
    public AdminDTO searchAdmin(String id) {
        if (repo.existsById(id)){
            return mapper.map(repo.findById(id).get(), AdminDTO.class);
        }else{
            throw new RuntimeException("No Admin For "+id+" ..!");
        }
    }

    @Override
    public List<AdminDTO> getAllAdmins() {
        return null;
    }
}
