package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.ObiettiviInd;
import io.github.jhipster.application.repository.ObiettiviIndRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ObiettiviIndResource REST controller.
 *
 * @see ObiettiviIndResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class ObiettiviIndResourceIntTest {

    private static final LocalDate DEFAULT_DT_INI = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DT_INI = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DT_FINE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DT_FINE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TI_SEGNO = "A";
    private static final String UPDATED_TI_SEGNO = "B";

    @Autowired
    private ObiettiviIndRepository obiettiviIndRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restObiettiviIndMockMvc;

    private ObiettiviInd obiettiviInd;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ObiettiviIndResource obiettiviIndResource = new ObiettiviIndResource(obiettiviIndRepository);
        this.restObiettiviIndMockMvc = MockMvcBuilders.standaloneSetup(obiettiviIndResource)
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
    public static ObiettiviInd createEntity(EntityManager em) {
        ObiettiviInd obiettiviInd = new ObiettiviInd()
            .dtIni(DEFAULT_DT_INI)
            .dtFine(DEFAULT_DT_FINE)
            .tiSegno(DEFAULT_TI_SEGNO);
        return obiettiviInd;
    }

    @Before
    public void initTest() {
        obiettiviInd = createEntity(em);
    }

    @Test
    @Transactional
    public void createObiettiviInd() throws Exception {
        int databaseSizeBeforeCreate = obiettiviIndRepository.findAll().size();

        // Create the ObiettiviInd
        restObiettiviIndMockMvc.perform(post("/api/obiettivi-inds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obiettiviInd)))
            .andExpect(status().isCreated());

        // Validate the ObiettiviInd in the database
        List<ObiettiviInd> obiettiviIndList = obiettiviIndRepository.findAll();
        assertThat(obiettiviIndList).hasSize(databaseSizeBeforeCreate + 1);
        ObiettiviInd testObiettiviInd = obiettiviIndList.get(obiettiviIndList.size() - 1);
        assertThat(testObiettiviInd.getDtIni()).isEqualTo(DEFAULT_DT_INI);
        assertThat(testObiettiviInd.getDtFine()).isEqualTo(DEFAULT_DT_FINE);
        assertThat(testObiettiviInd.getTiSegno()).isEqualTo(DEFAULT_TI_SEGNO);
    }

    @Test
    @Transactional
    public void createObiettiviIndWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = obiettiviIndRepository.findAll().size();

        // Create the ObiettiviInd with an existing ID
        obiettiviInd.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restObiettiviIndMockMvc.perform(post("/api/obiettivi-inds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obiettiviInd)))
            .andExpect(status().isBadRequest());

        // Validate the ObiettiviInd in the database
        List<ObiettiviInd> obiettiviIndList = obiettiviIndRepository.findAll();
        assertThat(obiettiviIndList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDtIniIsRequired() throws Exception {
        int databaseSizeBeforeTest = obiettiviIndRepository.findAll().size();
        // set the field null
        obiettiviInd.setDtIni(null);

        // Create the ObiettiviInd, which fails.

        restObiettiviIndMockMvc.perform(post("/api/obiettivi-inds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obiettiviInd)))
            .andExpect(status().isBadRequest());

        List<ObiettiviInd> obiettiviIndList = obiettiviIndRepository.findAll();
        assertThat(obiettiviIndList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDtFineIsRequired() throws Exception {
        int databaseSizeBeforeTest = obiettiviIndRepository.findAll().size();
        // set the field null
        obiettiviInd.setDtFine(null);

        // Create the ObiettiviInd, which fails.

        restObiettiviIndMockMvc.perform(post("/api/obiettivi-inds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obiettiviInd)))
            .andExpect(status().isBadRequest());

        List<ObiettiviInd> obiettiviIndList = obiettiviIndRepository.findAll();
        assertThat(obiettiviIndList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTiSegnoIsRequired() throws Exception {
        int databaseSizeBeforeTest = obiettiviIndRepository.findAll().size();
        // set the field null
        obiettiviInd.setTiSegno(null);

        // Create the ObiettiviInd, which fails.

        restObiettiviIndMockMvc.perform(post("/api/obiettivi-inds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obiettiviInd)))
            .andExpect(status().isBadRequest());

        List<ObiettiviInd> obiettiviIndList = obiettiviIndRepository.findAll();
        assertThat(obiettiviIndList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllObiettiviInds() throws Exception {
        // Initialize the database
        obiettiviIndRepository.saveAndFlush(obiettiviInd);

        // Get all the obiettiviIndList
        restObiettiviIndMockMvc.perform(get("/api/obiettivi-inds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(obiettiviInd.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtIni").value(hasItem(DEFAULT_DT_INI.toString())))
            .andExpect(jsonPath("$.[*].dtFine").value(hasItem(DEFAULT_DT_FINE.toString())))
            .andExpect(jsonPath("$.[*].tiSegno").value(hasItem(DEFAULT_TI_SEGNO.toString())));
    }

    @Test
    @Transactional
    public void getObiettiviInd() throws Exception {
        // Initialize the database
        obiettiviIndRepository.saveAndFlush(obiettiviInd);

        // Get the obiettiviInd
        restObiettiviIndMockMvc.perform(get("/api/obiettivi-inds/{id}", obiettiviInd.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(obiettiviInd.getId().intValue()))
            .andExpect(jsonPath("$.dtIni").value(DEFAULT_DT_INI.toString()))
            .andExpect(jsonPath("$.dtFine").value(DEFAULT_DT_FINE.toString()))
            .andExpect(jsonPath("$.tiSegno").value(DEFAULT_TI_SEGNO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingObiettiviInd() throws Exception {
        // Get the obiettiviInd
        restObiettiviIndMockMvc.perform(get("/api/obiettivi-inds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateObiettiviInd() throws Exception {
        // Initialize the database
        obiettiviIndRepository.saveAndFlush(obiettiviInd);
        int databaseSizeBeforeUpdate = obiettiviIndRepository.findAll().size();

        // Update the obiettiviInd
        ObiettiviInd updatedObiettiviInd = obiettiviIndRepository.findOne(obiettiviInd.getId());
        // Disconnect from session so that the updates on updatedObiettiviInd are not directly saved in db
        em.detach(updatedObiettiviInd);
        updatedObiettiviInd
            .dtIni(UPDATED_DT_INI)
            .dtFine(UPDATED_DT_FINE)
            .tiSegno(UPDATED_TI_SEGNO);

        restObiettiviIndMockMvc.perform(put("/api/obiettivi-inds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedObiettiviInd)))
            .andExpect(status().isOk());

        // Validate the ObiettiviInd in the database
        List<ObiettiviInd> obiettiviIndList = obiettiviIndRepository.findAll();
        assertThat(obiettiviIndList).hasSize(databaseSizeBeforeUpdate);
        ObiettiviInd testObiettiviInd = obiettiviIndList.get(obiettiviIndList.size() - 1);
        assertThat(testObiettiviInd.getDtIni()).isEqualTo(UPDATED_DT_INI);
        assertThat(testObiettiviInd.getDtFine()).isEqualTo(UPDATED_DT_FINE);
        assertThat(testObiettiviInd.getTiSegno()).isEqualTo(UPDATED_TI_SEGNO);
    }

    @Test
    @Transactional
    public void updateNonExistingObiettiviInd() throws Exception {
        int databaseSizeBeforeUpdate = obiettiviIndRepository.findAll().size();

        // Create the ObiettiviInd

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restObiettiviIndMockMvc.perform(put("/api/obiettivi-inds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obiettiviInd)))
            .andExpect(status().isCreated());

        // Validate the ObiettiviInd in the database
        List<ObiettiviInd> obiettiviIndList = obiettiviIndRepository.findAll();
        assertThat(obiettiviIndList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteObiettiviInd() throws Exception {
        // Initialize the database
        obiettiviIndRepository.saveAndFlush(obiettiviInd);
        int databaseSizeBeforeDelete = obiettiviIndRepository.findAll().size();

        // Get the obiettiviInd
        restObiettiviIndMockMvc.perform(delete("/api/obiettivi-inds/{id}", obiettiviInd.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ObiettiviInd> obiettiviIndList = obiettiviIndRepository.findAll();
        assertThat(obiettiviIndList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ObiettiviInd.class);
        ObiettiviInd obiettiviInd1 = new ObiettiviInd();
        obiettiviInd1.setId(1L);
        ObiettiviInd obiettiviInd2 = new ObiettiviInd();
        obiettiviInd2.setId(obiettiviInd1.getId());
        assertThat(obiettiviInd1).isEqualTo(obiettiviInd2);
        obiettiviInd2.setId(2L);
        assertThat(obiettiviInd1).isNotEqualTo(obiettiviInd2);
        obiettiviInd1.setId(null);
        assertThat(obiettiviInd1).isNotEqualTo(obiettiviInd2);
    }
}
