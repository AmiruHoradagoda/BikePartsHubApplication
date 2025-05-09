package com.bphTeam.bikePartsHub.dto.response.customerResponseDto;

import com.bphTeam.bikePartsHub.user.Role;
import lombok.Data;

@Data
public class CustomerProfileDto {
    private CustomerResponse customerResponse;
    //for order summery

//    private int pending;
//    private int cancelled;
//    private int onTheWay;
//    private int completed;


    private int o_pending;
    private int o_cancelled;
    private int o_onTheWay;
    private int o_completed;

    private int a_missed;
    private int a_attended;
    private int a_upcoming;
    private int a_completed;

    private Role role;
    private int totalOrder;
    private int totalSpend;
    private int totalSchedule;

}
