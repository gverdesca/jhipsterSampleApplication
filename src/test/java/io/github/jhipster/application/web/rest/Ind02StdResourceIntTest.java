package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Ind02Std;
import io.github.jhipster.application.repository.Ind02StdRepository;
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
 * Test class for the Ind02StdResource REST controller.
 *
 * @see Ind02StdResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class Ind02StdResourceIntTest {

    private static final String DEFAULT_DL_DES = "AAAAAAAAAA";
    private static final String UPDATED_DL_DES = "BBBBBBBBBB";

    private static final String DEFAULT_DL_URL = "AAAAAAAAAA";
    private static final String UPDATED_DL_URL = "BBBBBBBBBB";

    private static final String DEFAULT_DB_COD = "AAAAAAAAAA";
    private static final String UPDATED_DB_COD = "BBBBBBBBBB";

    @Autowired
    private Ind02StdRepository ind02StdRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInd02StdMockMvc;

    private Ind02Std ind02Std;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Ind02StdResource ind02StdResource = new Ind02StdResource(ind02StdRepository);
        this.restInd02StdMockMvc = MockMvcBuilders.standaloneSetup(ind02StdResource)
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
    public static Ind02Std createEntity(EntityManager em) {
        Ind02Std ind02Std = new Ind02Std()
            .dlDes(DEFAULT_DL_DES)
            .dlUrl(DEFAULT_DL_URL)
            .dbCod(DEFAULT_DB_COD);
        return ind02Std;
    }

    @Before
    public void initTest() {
        ind02Std = createEntity(em);
    }

    @Test
    @Transactional
    public void createInd02Std() throws Exception {
        int databaseSizeBeforeCreate = ind02StdRepository.findAll().size();

        // Create the Ind02Std
        restInd02StdMockMvc.perform(post("/api/ind-02-stds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind02Std)))
            .andExpect(status().isCreated());

        // Validate the Ind02Std in the database
        List<Ind02Std> ind02StdList = ind02StdRepository.findAll();
        assertThat(ind02StdList).hasSize(databaseSizeBeforeCreate + 1);
        Ind02Std testInd02Std = ind02StdList.get(ind02StdList.size() - 1);
        assertThat(testInd02Std.getDlDes()).isEqualTo(DEFAULT_DL_DES);
        assertThat(testInd02Std.getDlUrl()).isEqualTo(DEFAULT_DL_URL);
        assertThat(testInd02Std.getDbCod()).isEqualTo(DEFAULT_DB_COD);
    }

    @Test
    @Transactional
    public void createInd02StdWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ind02StdRepository.findAll().size();

        // Create the Ind02Std with an existing ID
        ind02Std.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInd02StdMockMvc.perform(post("/api/ind-02-stds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind02Std)))
            .andExpect(status().isBadRequest());

        // Validate the Ind02Std in the database
        List<Ind02Std> ind02StdList = ind02StdRepository.findAll();
        assertThat(ind02StdList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDlDesIsRequired() throws Exception {
        int databaseSizeBeforeTest = ind02StdRepository.findAll().size();
        // set the field null
        ind02Std.setDlDes(null);

        // Create the Ind02Std, which fails.

        restInd02StdMockMvc.perform(post("/api/ind-02-stds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind02Std)))
            .andExpect(status().isBadRequest());

        List<Ind02Std> ind02StdList = ind02StdRepository.findAll();
        assertThat(ind02StdList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDlUrlIsRequired() throws Exception {
        int databaseSizeBeforeTest = ind02StdRepository.findAll().size();
        // set the field null
        ind02Std.setDlUrl(null);

        // Create the Ind02Std, which fails.

        restInd02StdMockMvc.perform(post("/api/ind-02-stds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind02Std)))
            .andExpect(status().isBadRequest());

        List<Ind02Std> ind02StdList = ind02StdRepository.findAll();
        assertThat(ind02StdList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDbCodIsRequired() throws Exception {
        int databaseSizeBeforeTest = ind02StdRepository.findAll().size();
        // set the field null
        ind02Std.setDbCod(null);

        // Create the Ind02Std, which fails.

        restInd02StdMockMvc.perform(post("/api/ind-02-stds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind02Std)))
            .andExpect(status().isBadRequest());

        List<Ind02Std> ind02StdList = ind02StdRepository.findAll();
        assertThat(ind02StdList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInd02Stds() throws Exception {
        // Initialize the database
        ind02StdRepository.saveAndFlush(ind02Std);

        // Get all the ind02StdList
        restInd02StdMockMvc.perform(get("/api/ind-02-stds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ind02Std.getId().intValue())))
            .andExpect(jsonPath("$.[*].dlDes").value(hasItem(DEFAULT_DL_DES.toString())))
            .andExpect(jsonPath("$.[*].dlUrl").value(hasItem(DEFAULT_DL_URL.toString())))
            .andExpect(jsonPath("$.[*].dbCod").value(hasItem(DEFAULT_DB_COD.toString())));
    }

    @Test
    @Transactional
    public void getInd02Std() throws Exception {
        // Initialize the database
        ind02StdRepository.saveAndFlush(ind02Std);

        // Get the ind02Std
        restInd02StdMockMvc.perform(get("/api/ind-02-stds/{id}", ind02Std.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ind02Std.getId().intValue()))
            .andExpect(jsonPath("$.dlDes").value(DEFAULT_DL_DES.toString()))
            .andExpect(jsonPath("$.dlUrl").value(DEFAULT_DL_URL.toString()))
            .andExpect(jsonPath("$.dbCod").value(DEFAULT_DB_COD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInd02Std() throws Exception {
        // Get the ind02Std
        restInd02StdMockMvc.perform(get("/api/ind-02-stds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInd02Std() throws Exception {
        // Initialize the database
        ind02StdRepository.saveAndFlush(ind02Std);
        int databaseSizeBeforeUpdate = ind02StdRepository.findAll().size();

        // Update the ind02Std
        Ind02Std updatedInd02Std = ind02StdRepository.findOne(ind02Std.getId());
        // Disconnect from session so that the updates on updatedInd02Std are not directly saved in db
        em.detach(updatedInd02Std);
        updatedInd02Std
            .dlDes(UPDATED_DL_DES)
            .dlUrl(UPDATED_DL_URL)
            .dbCod(UPDATED_DB_COD);

        restInd02StdMockMvc.perform(put("/api/ind-02-stds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInd02Std)))
            .andExpect(status().isOk());

        // Validate the Ind02Std in the database
        List<Ind02Std> ind02StdList = ind02StdRepository.findAll();
        assertThat(ind02StdList).hasSize(databaseSizeBeforeUpdate);
        Ind02Std testInd02Std = ind02StdList.get(ind02StdList.size() - 1);
        assertThat(testInd02Std.getDlDes()).isEqualTo(UPDATED_DL_DES);
        assertThat(testInd02Std.getDlUrl()).isEqualTo(UPDATED_DL_URL);
        assertThat(testInd02Std.getDbCod()).isEqualTo(UPDATED_DB_COD);
    }

    @Test
    @Transactional
    public void updateNonExistingInd02Std() throws Exception {
        int databaseSizeBeforeUpdate = ind02StdRepository.findAll().size();

        // Create the Ind02Std

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInd02StdMockMvc.perform(put("/api/ind-02-stds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind02Std)))
            .andExpect(status().isCreated());

        // Validate the Ind02Std in the database
        List<Ind02Std> ind02StdList = ind02StdRepository.findAll();
        assertThat(ind02StdList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInd02Std() throws Exception {
        // Initialize the database
        ind02StdRepository.saveAndFlush(ind02Std);
        int databaseSizeBeforeDelete = ind02StdRepository.findAll().size();

        // Get the ind02Std
        restInd02StdMockMvc.perform(delete("/api/ind-02-stds/{id}", ind02Std.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ind02Std> ind02StdList = ind02StdRepository.findAll();
        assertThat(ind02StdList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ind02Std.class);
        Ind02Std ind02Std1 = new Ind02Std();
        ind02Std1.setId(1L);
        Ind02Std ind02Std2 = new Ind02Std();
        ind02Std2.setId(ind02Std1.getId());
        assertThat(ind02Std1).isEqualTo(ind02Std2);
        ind02Std2.setId(2L);
        assertThat(ind02Std1).isNotEqualTo(ind02Std2);
        ind02Std1.setId(null);
        assertThat(ind02Std1).isNotEqualTo(ind02Std2);
    }
}
