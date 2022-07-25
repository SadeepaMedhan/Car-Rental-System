package lk.easycar.repo;

import lk.easycar.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin, String> {
    boolean existsByEmail(String email);
    Admin findAdminByEmail(String email);
}
