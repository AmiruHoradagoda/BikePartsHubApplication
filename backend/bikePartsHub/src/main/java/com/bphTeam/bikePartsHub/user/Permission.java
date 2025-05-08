package com.bphTeam.bikePartsHub.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    CUSTOMER_READ("customer:read"),
    CUSTOMER_UPDATE("customer:update"),
    CUSTOMER_CREATE("customer:create"),
    CUSTOMER_DELETE("customer:delete"),
    LOYAL_CUSTOMER_READ("loyal_customer:read"),
    LOYAL_CUSTOMER_UPDATE("loyal_customer:update"),
    LOYAL_CUSTOMER_CREATE("loyal_customer:create"),
    LOYAL_CUSTOMER_DELETE("loyal_customer:delete")
    ;

    @Getter
    private final String permission;
}