package com.hospital.config;

import java.util.Arrays;
import org.springframework.http.HttpMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import jakarta.servlet.http.HttpServletResponse;

import com.hospital.security.JwtAuthenticationFilter;
import com.hospital.security.UserDetailsServiceImpl;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

	@Autowired
	private UserDetailsServiceImpl detailsServiceImpl;

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.authorizeHttpRequests(authorizeRequests -> authorizeRequests
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
						.requestMatchers("/", "/hospital/**", "/home", "/api/patients/register",
								"/api/doctors/registerDoctor", "/api/login")
						.permitAll().requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
						.requestMatchers("/api/doctors/fetchAllDoctors")
						.hasAnyAuthority("ROLE_PATIENT", "ROLE_ADMIN", "ROLE_DOCTOR")
						.requestMatchers("/api/doctors/**").hasAnyAuthority("ROLE_DOCTOR", "ROLE_ADMIN")
						.requestMatchers("/api/nurse/**").hasAuthority("ROLE_NURSE")
						.requestMatchers("/api/staff/**").hasAuthority("ROLE_STAFF")
						.requestMatchers("/api/patients/**").hasAnyAuthority("ROLE_PATIENT", "ROLE_ADMIN")
						.requestMatchers("/api/appointments/**")
						.hasAnyAuthority("ROLE_PATIENT", "ROLE_DOCTOR", "ROLE_ADMIN")
						.anyRequest().authenticated())
				.exceptionHandling(
						exception -> exception.authenticationEntryPoint((request, response, authException) -> {
							response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
							response.setContentType("application/json");
							response.getWriter().write("{\"error\": \"" + authException.getMessage() + "\"}");
						}))
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider())
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(detailsServiceImpl);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowCredentials(true);
		configuration.setAllowedOriginPatterns(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
