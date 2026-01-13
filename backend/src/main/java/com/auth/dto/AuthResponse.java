package com.auth.dto;

public class AuthResponse {
    private String token;
    private UserResponse user;

    public AuthResponse() {
    }

    public AuthResponse(String token, UserResponse user) {
        this.token = token;
        this.user = user;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String token;
        private UserResponse user;

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public Builder user(UserResponse user) {
            this.user = user;
            return this;
        }

        public AuthResponse build() {
            return new AuthResponse(token, user);
        }
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }
}
