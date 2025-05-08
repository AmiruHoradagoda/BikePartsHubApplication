package com.bphTeam.bikePartsHub.dto.response.customerResponseDto;

import com.bphTeam.bikePartsHub.user.Role;
import lombok.Data;

@Data
public class CustomerProfileDto {
    private CustomerResponse customerResponse;
    private int pending;
    private int cancelled;
    private int onTheWay;
    private int completed;
    private Role role;
    private int totalOrder;
    private int totalSpend;
    private int totalSchedule;

}
