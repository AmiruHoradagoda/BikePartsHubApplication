package com.bphTeam.bikePartsHub.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.bphTeam.bikePartsHub.user.Permission.*;

@RequiredArgsConstructor
public enum Role {

    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_UPDATE,
                    ADMIN_DELETE,
                    ADMIN_CREATE
            )
    ),
    CUSTOMER(
            Set.of(
                    CUSTOMER_READ,
                    CUSTOMER_UPDATE,
                    CUSTOMER_DELETE,
                    CUSTOMER_CREATE
            )
    ),
    LOYAL_CUSTOMER(
            Set.of(
                    LOYAL_CUSTOMER_READ,
                    LOYAL_CUSTOMER_UPDATE,
                    LOYAL_CUSTOMER_DELETE,
                    LOYAL_CUSTOMER_CREATE
            )
    )

    ;

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}