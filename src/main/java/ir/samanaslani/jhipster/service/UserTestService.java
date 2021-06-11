package ir.samanaslani.jhipster.service;

import ir.samanaslani.jhipster.domain.UserTest;
import ir.samanaslani.jhipster.repository.UserTestRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link UserTest}.
 */
@Service
@Transactional
public class UserTestService {

    private final Logger log = LoggerFactory.getLogger(UserTestService.class);

    private final UserTestRepository userTestRepository;

    public UserTestService(UserTestRepository userTestRepository) {
        this.userTestRepository = userTestRepository;
    }

    /**
     * Save a userTest.
     *
     * @param userTest the entity to save.
     * @return the persisted entity.
     */
    public UserTest save(UserTest userTest) {
        log.debug("Request to save UserTest : {}", userTest);
        return userTestRepository.save(userTest);
    }

    /**
     * Partially update a userTest.
     *
     * @param userTest the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<UserTest> partialUpdate(UserTest userTest) {
        log.debug("Request to partially update UserTest : {}", userTest);

        return userTestRepository
            .findById(userTest.getId())
            .map(
                existingUserTest -> {
                    if (userTest.getFirstName() != null) {
                        existingUserTest.setFirstName(userTest.getFirstName());
                    }
                    if (userTest.getLastName() != null) {
                        existingUserTest.setLastName(userTest.getLastName());
                    }
                    if (userTest.getReferralCode() != null) {
                        existingUserTest.setReferralCode(userTest.getReferralCode());
                    }
                    if (userTest.getNationalCode() != null) {
                        existingUserTest.setNationalCode(userTest.getNationalCode());
                    }
                    if (userTest.getPhoneNumber() != null) {
                        existingUserTest.setPhoneNumber(userTest.getPhoneNumber());
                    }
                    if (userTest.getEmail() != null) {
                        existingUserTest.setEmail(userTest.getEmail());
                    }

                    return existingUserTest;
                }
            )
            .map(userTestRepository::save);
    }

    /**
     * Get all the userTests.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<UserTest> findAll() {
        log.debug("Request to get all UserTests");
        return userTestRepository.findAll();
    }

    /**
     * Get one userTest by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<UserTest> findOne(Long id) {
        log.debug("Request to get UserTest : {}", id);
        return userTestRepository.findById(id);
    }

    /**
     * Delete the userTest by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete UserTest : {}", id);
        userTestRepository.deleteById(id);
    }
}
