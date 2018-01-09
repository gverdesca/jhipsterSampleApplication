package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Ind01Indic;
import io.github.jhipster.application.repository.Ind01IndicRepository;
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
 * Test class for the Ind01IndicResource REST controller.
 *
 * @see Ind01IndicResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class Ind01IndicResourceIntTest {

    private static final String DEFAULT_DL_DES = "AAAAAAAAAA";
    private static final String UPDATED_DL_DES = "BBBBBBBBBB";

    private static final String DEFAULT_LT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_LT_NOTE = "BBBBBBBBBB";

    private static final String DEFAULT_DL_PATH_OWL = "AAAAAAAAAA";
    private static final String UPDATED_DL_PATH_OWL = "BBBBBBBBBB";

    private static final String DEFAULT_DL_IRI = "AAAAAAAAAA";
    private static final String UPDATED_DL_IRI = "BBBBBBBBBB";

    private static final String DEFAULT_DB_COD = "AAAAAAAAAA";
    private static final String UPDATED_DB_COD = "BBBBBBBBBB";

    @Autowired
    private Ind01IndicRepository ind01IndicRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInd01IndicMockMvc;

    private Ind01Indic ind01Indic;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Ind01IndicResource ind01IndicResource = new Ind01IndicResource(ind01IndicRepository);
        this.restInd01IndicMockMvc = MockMvcBuilders.standaloneSetup(ind01IndicResource)
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
    public static Ind01Indic createEntity(EntityManager em) {
        Ind01Indic ind01Indic = new Ind01Indic()
            .dlDes(DEFAULT_DL_DES)
            .ltNote(DEFAULT_LT_NOTE)
            .dlPathOwl(DEFAULT_DL_PATH_OWL)
            .dlIri(DEFAULT_DL_IRI)
            .dbCod(DEFAULT_DB_COD);
        return ind01Indic;
    }

    @Before
    public void initTest() {
        ind01Indic = createEntity(em);
    }

    @Test
    @Transactional
    public void createInd01Indic() throws Exception {
        int databaseSizeBeforeCreate = ind01IndicRepository.findAll().size();

        // Create the Ind01Indic
        restInd01IndicMockMvc.perform(post("/api/ind-01-indics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind01Indic)))
            .andExpect(status().isCreated());

        // Validate the Ind01Indic in the database
        List<Ind01Indic> ind01IndicList = ind01IndicRepository.findAll();
        assertThat(ind01IndicList).hasSize(databaseSizeBeforeCreate + 1);
        Ind01Indic testInd01Indic = ind01IndicList.get(ind01IndicList.size() - 1);
        assertThat(testInd01Indic.getDlDes()).isEqualTo(DEFAULT_DL_DES);
        assertThat(testInd01Indic.getLtNote()).isEqualTo(DEFAULT_LT_NOTE);
        assertThat(testInd01Indic.getDlPathOwl()).isEqualTo(DEFAULT_DL_PATH_OWL);
        assertThat(testInd01Indic.getDlIri()).isEqualTo(DEFAULT_DL_IRI);
        assertThat(testInd01Indic.getDbCod()).isEqualTo(DEFAULT_DB_COD);
    }

    @Test
    @Transactional
    public void createInd01IndicWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ind01IndicRepository.findAll().size();

        // Create the Ind01Indic with an existing ID
        ind01Indic.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInd01IndicMockMvc.perform(post("/api/ind-01-indics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind01Indic)))
            .andExpect(status().isBadRequest());

        // Validate the Ind01Indic in the database
        List<Ind01Indic> ind01IndicList = ind01IndicRepository.findAll();
        assertThat(ind01IndicList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLtNoteIsRequired() throws Exception {
        int databaseSizeBeforeTest = ind01IndicRepository.findAll().size();
        // set the field null
        ind01Indic.setLtNote(null);

        // Create the Ind01Indic, which fails.

        restInd01IndicMockMvc.perform(post("/api/ind-01-indics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind01Indic)))
            .andExpect(status().isBadRequest());

        List<Ind01Indic> ind01IndicList = ind01IndicRepository.findAll();
        assertThat(ind01IndicList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDlPathOwlIsRequired() throws Exception {
        int databaseSizeBeforeTest = ind01IndicRepository.findAll().size();
        // set the field null
        ind01Indic.setDlPathOwl(null);

        // Create the Ind01Indic, which fails.

        restInd01IndicMockMvc.perform(post("/api/ind-01-indics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind01Indic)))
            .andExpect(status().isBadRequest());

        List<Ind01Indic> ind01IndicList = ind01IndicRepository.findAll();
        assertThat(ind01IndicList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDlIriIsRequired() throws Exception {
        int databaseSizeBeforeTest = ind01IndicRepository.findAll().size();
        // set the field null
        ind01Indic.setDlIri(null);

        // Create the Ind01Indic, which fails.

        restInd01IndicMockMvc.perform(post("/api/ind-01-indics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind01Indic)))
            .andExpect(status().isBadRequest());

        List<Ind01Indic> ind01IndicList = ind01IndicRepository.findAll();
        assertThat(ind01IndicList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDbCodIsRequired() throws Exception {
        int databaseSizeBeforeTest = ind01IndicRepository.findAll().size();
        // set the field null
        ind01Indic.setDbCod(null);

        // Create the Ind01Indic, which fails.

        restInd01IndicMockMvc.perform(post("/api/ind-01-indics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind01Indic)))
            .andExpect(status().isBadRequest());

        List<Ind01Indic> ind01IndicList = ind01IndicRepository.findAll();
        assertThat(ind01IndicList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInd01Indics() throws Exception {
        // Initialize the database
        ind01IndicRepository.saveAndFlush(ind01Indic);

        // Get all the ind01IndicList
        restInd01IndicMockMvc.perform(get("/api/ind-01-indics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ind01Indic.getId().intValue())))
            .andExpect(jsonPath("$.[*].dlDes").value(hasItem(DEFAULT_DL_DES.toString())))
            .andExpect(jsonPath("$.[*].ltNote").value(hasItem(DEFAULT_LT_NOTE.toString())))
            .andExpect(jsonPath("$.[*].dlPathOwl").value(hasItem(DEFAULT_DL_PATH_OWL.toString())))
            .andExpect(jsonPath("$.[*].dlIri").value(hasItem(DEFAULT_DL_IRI.toString())))
            .andExpect(jsonPath("$.[*].dbCod").value(hasItem(DEFAULT_DB_COD.toString())));
    }

    @Test
    @Transactional
    public void getInd01Indic() throws Exception {
        // Initialize the database
        ind01IndicRepository.saveAndFlush(ind01Indic);

        // Get the ind01Indic
        restInd01IndicMockMvc.perform(get("/api/ind-01-indics/{id}", ind01Indic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ind01Indic.getId().intValue()))
            .andExpect(jsonPath("$.dlDes").value(DEFAULT_DL_DES.toString()))
            .andExpect(jsonPath("$.ltNote").value(DEFAULT_LT_NOTE.toString()))
            .andExpect(jsonPath("$.dlPathOwl").value(DEFAULT_DL_PATH_OWL.toString()))
            .andExpect(jsonPath("$.dlIri").value(DEFAULT_DL_IRI.toString()))
            .andExpect(jsonPath("$.dbCod").value(DEFAULT_DB_COD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInd01Indic() throws Exception {
        // Get the ind01Indic
        restInd01IndicMockMvc.perform(get("/api/ind-01-indics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInd01Indic() throws Exception {
        // Initialize the database
        ind01IndicRepository.saveAndFlush(ind01Indic);
        int databaseSizeBeforeUpdate = ind01IndicRepository.findAll().size();

        // Update the ind01Indic
        Ind01Indic updatedInd01Indic = ind01IndicRepository.findOne(ind01Indic.getId());
        // Disconnect from session so that the updates on updatedInd01Indic are not directly saved in db
        em.detach(updatedInd01Indic);
        updatedInd01Indic
            .dlDes(UPDATED_DL_DES)
            .ltNote(UPDATED_LT_NOTE)
            .dlPathOwl(UPDATED_DL_PATH_OWL)
            .dlIri(UPDATED_DL_IRI)
            .dbCod(UPDATED_DB_COD);

        restInd01IndicMockMvc.perform(put("/api/ind-01-indics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInd01Indic)))
            .andExpect(status().isOk());

        // Validate the Ind01Indic in the database
        List<Ind01Indic> ind01IndicList = ind01IndicRepository.findAll();
        assertThat(ind01IndicList).hasSize(databaseSizeBeforeUpdate);
        Ind01Indic testInd01Indic = ind01IndicList.get(ind01IndicList.size() - 1);
        assertThat(testInd01Indic.getDlDes()).isEqualTo(UPDATED_DL_DES);
        assertThat(testInd01Indic.getLtNote()).isEqualTo(UPDATED_LT_NOTE);
        assertThat(testInd01Indic.getDlPathOwl()).isEqualTo(UPDATED_DL_PATH_OWL);
        assertThat(testInd01Indic.getDlIri()).isEqualTo(UPDATED_DL_IRI);
        assertThat(testInd01Indic.getDbCod()).isEqualTo(UPDATED_DB_COD);
    }

    @Test
    @Transactional
    public void updateNonExistingInd01Indic() throws Exception {
        int databaseSizeBeforeUpdate = ind01IndicRepository.findAll().size();

        // Create the Ind01Indic

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInd01IndicMockMvc.perform(put("/api/ind-01-indics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ind01Indic)))
            .andExpect(status().isCreated());

        // Validate the Ind01Indic in the database
        List<Ind01Indic> ind01IndicList = ind01IndicRepository.findAll();
        assertThat(ind01IndicList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInd01Indic() throws Exception {
        // Initialize the database
        ind01IndicRepository.saveAndFlush(ind01Indic);
        int databaseSizeBeforeDelete = ind01IndicRepository.findAll().size();

        // Get the ind01Indic
        restInd01IndicMockMvc.perform(delete("/api/ind-01-indics/{id}", ind01Indic.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ind01Indic> ind01IndicList = ind01IndicRepository.findAll();
        assertThat(ind01IndicList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ind01Indic.class);
        Ind01Indic ind01Indic1 = new Ind01Indic();
        ind01Indic1.setId(1L);
        Ind01Indic ind01Indic2 = new Ind01Indic();
        ind01Indic2.setId(ind01Indic1.getId());
        assertThat(ind01Indic1).isEqualTo(ind01Indic2);
        ind01Indic2.setId(2L);
        assertThat(ind01Indic1).isNotEqualTo(ind01Indic2);
        ind01Indic1.setId(null);
        assertThat(ind01Indic1).isNotEqualTo(ind01Indic2);
    }
}
