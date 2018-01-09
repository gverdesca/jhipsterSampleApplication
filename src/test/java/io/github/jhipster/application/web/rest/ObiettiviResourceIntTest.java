package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Obiettivi;
import io.github.jhipster.application.repository.ObiettiviRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ObiettiviResource REST controller.
 *
 * @see ObiettiviResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class ObiettiviResourceIntTest {

    private static final String DEFAULT_CD_OBI = "AAAAAAAAAA";
    private static final String UPDATED_CD_OBI = "BBBBBBBBBB";

    private static final String DEFAULT_DL_OBI = "AAAAAAAAAA";
    private static final String UPDATED_DL_OBI = "BBBBBBBBBB";

    private static final String DEFAULT_DL_ICONA = "AAAAAAAAAA";
    private static final String UPDATED_DL_ICONA = "BBBBBBBBBB";

    @Autowired
    private ObiettiviRepository obiettiviRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restObiettiviMockMvc;

    private Obiettivi obiettivi;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ObiettiviResource obiettiviResource = new ObiettiviResource(obiettiviRepository);
        this.restObiettiviMockMvc = MockMvcBuilders.standaloneSetup(obiettiviResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Obiettivi createEntity(EntityManager em) {
        Obiettivi obiettivi = new Obiettivi()
            .cdObi(DEFAULT_CD_OBI)
            .dlObi(DEFAULT_DL_OBI)
            .dlIcona(DEFAULT_DL_ICONA);
        return obiettivi;
    }

    @Before
    public void initTest() {
        obiettivi = createEntity(em);
    }

    @Test
    @Transactional
    public void createObiettivi() throws Exception {
        int databaseSizeBeforeCreate = obiettiviRepository.findAll().size();

        // Create the Obiettivi
        restObiettiviMockMvc.perform(post("/api/obiettivis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obiettivi)))
            .andExpect(status().isCreated());

        // Validate the Obiettivi in the database
        List<Obiettivi> obiettiviList = obiettiviRepository.findAll();
        assertThat(obiettiviList).hasSize(databaseSizeBeforeCreate + 1);
        Obiettivi testObiettivi = obiettiviList.get(obiettiviList.size() - 1);
        assertThat(testObiettivi.getCdObi()).isEqualTo(DEFAULT_CD_OBI);
        assertThat(testObiettivi.getDlObi()).isEqualTo(DEFAULT_DL_OBI);
        assertThat(testObiettivi.getDlIcona()).isEqualTo(DEFAULT_DL_ICONA);
    }

    @Test
    @Transactional
    public void createObiettiviWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = obiettiviRepository.findAll().size();

        // Create the Obiettivi with an existing ID
        obiettivi.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restObiettiviMockMvc.perform(post("/api/obiettivis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obiettivi)))
            .andExpect(status().isBadRequest());

        // Validate the Obiettivi in the database
        List<Obiettivi> obiettiviList = obiettiviRepository.findAll();
        assertThat(obiettiviList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllObiettivis() throws Exception {
        // Initialize the database
        obiettiviRepository.saveAndFlush(obiettivi);

        // Get all the obiettiviList
        restObiettiviMockMvc.perform(get("/api/obiettivis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(obiettivi.getId().intValue())))
            .andExpect(jsonPath("$.[*].cdObi").value(hasItem(DEFAULT_CD_OBI.toString())))
            .andExpect(jsonPath("$.[*].dlObi").value(hasItem(DEFAULT_DL_OBI.toString())))
            .andExpect(jsonPath("$.[*].dlIcona").value(hasItem(DEFAULT_DL_ICONA.toString())));
    }

    @Test
    @Transactional
    public void getObiettivi() throws Exception {
        // Initialize the database
        obiettiviRepository.saveAndFlush(obiettivi);

        // Get the obiettivi
        restObiettiviMockMvc.perform(get("/api/obiettivis/{id}", obiettivi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(obiettivi.getId().intValue()))
            .andExpect(jsonPath("$.cdObi").value(DEFAULT_CD_OBI.toString()))
            .andExpect(jsonPath("$.dlObi").value(DEFAULT_DL_OBI.toString()))
            .andExpect(jsonPath("$.dlIcona").value(DEFAULT_DL_ICONA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingObiettivi() throws Exception {
        // Get the obiettivi
        restObiettiviMockMvc.perform(get("/api/obiettivis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateObiettivi() throws Exception {
        // Initialize the database
        obiettiviRepository.saveAndFlush(obiettivi);
        int databaseSizeBeforeUpdate = obiettiviRepository.findAll().size();

        // Update the obiettivi
        Obiettivi updatedObiettivi = obiettiviRepository.findOne(obiettivi.getId());
        // Disconnect from session so that the updates on updatedObiettivi are not directly saved in db
        em.detach(updatedObiettivi);
        updatedObiettivi
            .cdObi(UPDATED_CD_OBI)
            .dlObi(UPDATED_DL_OBI)
            .dlIcona(UPDATED_DL_ICONA);

        restObiettiviMockMvc.perform(put("/api/obiettivis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedObiettivi)))
            .andExpect(status().isOk());

        // Validate the Obiettivi in the database
        List<Obiettivi> obiettiviList = obiettiviRepository.findAll();
        assertThat(obiettiviList).hasSize(databaseSizeBeforeUpdate);
        Obiettivi testObiettivi = obiettiviList.get(obiettiviList.size() - 1);
        assertThat(testObiettivi.getCdObi()).isEqualTo(UPDATED_CD_OBI);
        assertThat(testObiettivi.getDlObi()).isEqualTo(UPDATED_DL_OBI);
        assertThat(testObiettivi.getDlIcona()).isEqualTo(UPDATED_DL_ICONA);
    }

    @Test
    @Transactional
    public void updateNonExistingObiettivi() throws Exception {
        int databaseSizeBeforeUpdate = obiettiviRepository.findAll().size();

        // Create the Obiettivi

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restObiettiviMockMvc.perform(put("/api/obiettivis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obiettivi)))
            .andExpect(status().isCreated());

        // Validate the Obiettivi in the database
        List<Obiettivi> obiettiviList = obiettiviRepository.findAll();
        assertThat(obiettiviList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteObiettivi() throws Exception {
        // Initialize the database
        obiettiviRepository.saveAndFlush(obiettivi);
        int databaseSizeBeforeDelete = obiettiviRepository.findAll().size();

        // Get the obiettivi
        restObiettiviMockMvc.perform(delete("/api/obiettivis/{id}", obiettivi.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Obiettivi> obiettiviList = obiettiviRepository.findAll();
        assertThat(obiettiviList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Obiettivi.class);
        Obiettivi obiettivi1 = new Obiettivi();
        obiettivi1.setId(1L);
        Obiettivi obiettivi2 = new Obiettivi();
        obiettivi2.setId(obiettivi1.getId());
        assertThat(obiettivi1).isEqualTo(obiettivi2);
        obiettivi2.setId(2L);
        assertThat(obiettivi1).isNotEqualTo(obiettivi2);
        obiettivi1.setId(null);
        assertThat(obiettivi1).isNotEqualTo(obiettivi2);
    }
}
