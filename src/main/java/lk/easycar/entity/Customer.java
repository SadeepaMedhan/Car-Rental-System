package lk.easycar.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Customer {
    @Id
    private String cusID;
    private String cusName;
    private String cusEmail;
    private String cusPassword;
    private String cusNIC;
    private String cusDrivingLicenseNo;
    private String cusAddress;
    private String cusContactNo;

    public Customer() {
    }

    public Customer(String cusID, String cusName, String cusEmail, String cusPassword, String cusNIC, String cusDrivingLicenseNo, String cusAddress, String cusContactNo) {
        this.cusID = cusID;
        this.cusName = cusName;
        this.cusEmail = cusEmail;
        this.cusPassword = cusPassword;
        this.cusNIC = cusNIC;
        this.cusDrivingLicenseNo = cusDrivingLicenseNo;
        this.cusAddress = cusAddress;
        this.cusContactNo = cusContactNo;
    }

    public String getCusID() {
        return cusID;
    }

    public void setCusID(String cusID) {
        this.cusID = cusID;
    }

    public String getCusName() {
        return cusName;
    }

    public void setCusName(String cusName) {
        this.cusName = cusName;
    }

    public String getCusEmail() {
        return cusEmail;
    }

    public void setCusEmail(String cusEmail) {
        this.cusEmail = cusEmail;
    }

    public String getCusPassword() {
        return cusPassword;
    }

    public void setCusPassword(String cusPassword) {
        this.cusPassword = cusPassword;
    }

    public String getCusNIC() {
        return cusNIC;
    }

    public void setCusNIC(String cusNIC) {
        this.cusNIC = cusNIC;
    }

    public String getCusDrivingLicenseNo() {
        return cusDrivingLicenseNo;
    }

    public void setCusDrivingLicenseNo(String cusDrivingLicenseNo) {
        this.cusDrivingLicenseNo = cusDrivingLicenseNo;
    }

    public String getCusAddress() {
        return cusAddress;
    }

    public void setCusAddress(String cusAddress) {
        this.cusAddress = cusAddress;
    }

    public String getCusContactNo() {
        return cusContactNo;
    }

    public void setCusContactNo(String cusContactNo) {
        this.cusContactNo = cusContactNo;
    }
}
