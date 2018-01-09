package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Ind04Classif;
import io.github.jhipster.application.repository.Ind04ClassifRepository;
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
 * Test class for the Ind04ClassifResource REST controller.
 *
 * @see Ind04ClassifResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class Ind04ClassifResourceIntTest {

    private static final String DEFAULT_DL_DES = "AAAAAAAAAA";
    private static final String UPDATED_DL_DES = "BBBBBBBBBB";

    private static final String DEFAULT_DB_COD = "AAAAAAAAAA";
    private static final String UPDATED_DB_COD = "BBBBBBBBBB";

    @Autowired
    private Ind04ClassifRepository ind04ClassifRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInd04ClassifMockMvc;

    private Ind04Classif ind04Classif;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Ind04ClassifResource ind04ClassifResource = new Ind04ClassifResource(ind04ClassifRepository);
        this.restInd04ClassifMockMvc = MockMvcBuilders.standaloneSetup(ind04ClassifResource)
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
    public static Ind04Classif createEntity(EntityManager em) {
        Ind04Classif ind04Classif = new Ind04Classif()
            .dlDes(DEFAULT_DL_DES)
            .dbCod(DEFAULT_DB_COD);
        return ind04Classif;
    }

    @Before
    public void initTest() {
        ind04Classif = createEntity(em);
    }

    @Test
    @Transactional
    public void createInd04Classif() throws Exception {
        int databaseSizeBeforeCreate = ind04ClassifRepository.findAll().size();

        // Create the Ind04Classif
        restInd04ClassifMockMvc.perform(post("/api/ind-04-classifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind04Classif)))
            .andExpect(status().isCreated());

        // Validate the Ind04Classif in the database
        List<Ind04Classif> ind04ClassifList = ind04ClassifRepository.findAll();
        assertThat(ind04ClassifList).hasSize(databaseSizeBeforeCreate + 1);
        Ind04Classif testInd04Classif = ind04ClassifList.get(ind04ClassifList.size() - 1);
        assertThat(testInd04Classif.getDlDes()).isEqualTo(DEFAULT_DL_DES);
        assertThat(testInd04Classif.getDbCod()).isEqualTo(DEFAULT_DB_COD);
    }

    @Test
    @Transactional
    public void createInd04ClassifWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ind04ClassifRepository.findAll().size();

        // Create the Ind04Classif with an existing ID
        ind04Classif.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInd04ClassifMockMvc.perform(post("/api/ind-04-classifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind04Classif)))
            .andExpect(status().isBadRequest());

        // Validate the Ind04Classif in the database
        List<Ind04Classif> ind04ClassifList = ind04ClassifRepository.findAll();
        assertThat(ind04ClassifList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDlDesIsRequired() throws Exception {
        int databaseSizeBeforeTest = ind04ClassifRepository.findAll().size();
        // set the field null
        ind04Classif.setDlDes(null);

        // Create the Ind04Classif, which fails.

        restInd04ClassifMockMvc.perform(post("/api/ind-04-classifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind04Classif)))
            .andExpect(status().isBadRequest());

        List<Ind04Classif> ind04ClassifList = ind04ClassifRepository.findAll();
        assertThat(ind04ClassifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDbCodIsRequired() throws Exception {
        int databaseSizeBeforeTest = ind04ClassifRepository.findAll().size();
        // set the field null
        ind04Classif.setDbCod(null);

        // Create the Ind04Classif, which fails.

        restInd04ClassifMockMvc.perform(post("/api/ind-04-classifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind04Classif)))
            .andExpect(status().isBadRequest());

        List<Ind04Classif> ind04ClassifList = ind04ClassifRepository.findAll();
        assertThat(ind04ClassifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInd04Classifs() throws Exception {
        // Initialize the database
        ind04ClassifRepository.saveAndFlush(ind04Classif);

        // Get all the ind04ClassifList
        restInd04ClassifMockMvc.perform(get("/api/ind-04-classifs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ind04Classif.getId().intValue())))
            .andExpect(jsonPath("$.[*].dlDes").value(hasItem(DEFAULT_DL_DES.toString())))
            .andExpect(jsonPath("$.[*].dbCod").value(hasItem(DEFAULT_DB_COD.toString())));
    }

    @Test
    @Transactional
    public void getInd04Classif() throws Exception {
        // Initialize the database
        ind04ClassifRepository.saveAndFlush(ind04Classif);

        // Get the ind04Classif
        restInd04ClassifMockMvc.perform(get("/api/ind-04-classifs/{id}", ind04Classif.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ind04Classif.getId().intValue()))
            .andExpect(jsonPath("$.dlDes").value(DEFAULT_DL_DES.toString()))
            .andExpect(jsonPath("$.dbCod").value(DEFAULT_DB_COD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInd04Classif() throws Exception {
        // Get the ind04Classif
        restInd04ClassifMockMvc.perform(get("/api/ind-04-classifs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInd04Classif() throws Exception {
        // Initialize the database
        ind04ClassifRepository.saveAndFlush(ind04Classif);
        int databaseSizeBeforeUpdate = ind04ClassifRepository.findAll().size();

        // Update the ind04Classif
        Ind04Classif updatedInd04Classif = ind04ClassifRepository.findOne(ind04Classif.getId());
        // Disconnect from session so that the updates on updatedInd04Classif are not directly saved in db
        em.detach(updatedInd04Classif);
        updatedInd04Classif
            .dlDes(UPDATED_DL_DES)
            .dbCod(UPDATED_DB_COD);

        restInd04ClassifMockMvc.perform(put("/api/ind-04-classifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInd04Classif)))
            .andExpect(status().isOk());

        // Validate the Ind04Classif in the database
        List<Ind04Classif> ind04ClassifList = ind04ClassifRepository.findAll();
        assertThat(ind04ClassifList).hasSize(databaseSizeBeforeUpdate);
        Ind04Classif testInd04Classif = ind04ClassifList.get(ind04ClassifList.size() - 1);
        assertThat(testInd04Classif.getDlDes()).isEqualTo(UPDATED_DL_DES);
        assertThat(testInd04Classif.getDbCod()).isEqualTo(UPDATED_DB_COD);
    }

    @Test
    @Transactional
    public void updateNonExistingInd04Classif() throws Exception {
        int databaseSizeBeforeUpdate = ind04ClassifRepository.findAll().size();

        // Create the Ind04Classif

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInd04ClassifMockMvc.perform(put("/api/ind-04-classifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind04Classif)))
            .andExpect(status().isCreated());

        // Validate the Ind04Classif in the database
        List<Ind04Classif> ind04ClassifList = ind04ClassifRepository.findAll();
        assertThat(ind04ClassifList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInd04Classif() throws Exception {
        // Initialize the database
        ind04ClassifRepository.saveAndFlush(ind04Classif);
        int databaseSizeBeforeDelete = ind04ClassifRepository.findAll().size();

        // Get the ind04Classif
        restInd04ClassifMockMvc.perform(delete("/api/ind-04-classifs/{id}", ind04Classif.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ind04Classif> ind04ClassifList = ind04ClassifRepository.findAll();
        assertThat(ind04ClassifList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ind04Classif.class);
        Ind04Classif ind04Classif1 = new Ind04Classif();
        ind04Classif1.setId(1L);
        Ind04Classif ind04Classif2 = new Ind04Classif();
        ind04Classif2.setId(ind04Classif1.getId());
        assertThat(ind04Classif1).isEqualTo(ind04Classif2);
        ind04Classif2.setId(2L);
        assertThat(ind04Classif1).isNotEqualTo(ind04Classif2);
        ind04Classif1.setId(null);
        assertThat(ind04Classif1).isNotEqualTo(ind04Classif2);
    }
}
