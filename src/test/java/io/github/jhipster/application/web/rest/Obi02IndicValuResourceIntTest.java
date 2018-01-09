package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Obi02IndicValu;
import io.github.jhipster.application.repository.Obi02IndicValuRepository;
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
 * Test class for the Obi02IndicValuResource REST controller.
 *
 * @see Obi02IndicValuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class Obi02IndicValuResourceIntTest {

    private static final Float DEFAULT_TIVALU = 1F;
    private static final Float UPDATED_TIVALU = 2F;

    private static final Float DEFAULT_NDVALINF = 1F;
    private static final Float UPDATED_NDVALINF = 2F;

    private static final Float DEFAULT_NDVALSUP = 1F;
    private static final Float UPDATED_NDVALSUP = 2F;

    @Autowired
    private Obi02IndicValuRepository obi02IndicValuRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restObi02IndicValuMockMvc;

    private Obi02IndicValu obi02IndicValu;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Obi02IndicValuResource obi02IndicValuResource = new Obi02IndicValuResource(obi02IndicValuRepository);
        this.restObi02IndicValuMockMvc = MockMvcBuilders.standaloneSetup(obi02IndicValuResource)
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
    public static Obi02IndicValu createEntity(EntityManager em) {
        Obi02IndicValu obi02IndicValu = new Obi02IndicValu()
            .tivalu(DEFAULT_TIVALU)
            .ndvalinf(DEFAULT_NDVALINF)
            .ndvalsup(DEFAULT_NDVALSUP);
        return obi02IndicValu;
    }

    @Before
    public void initTest() {
        obi02IndicValu = createEntity(em);
    }

    @Test
    @Transactional
    public void createObi02IndicValu() throws Exception {
        int databaseSizeBeforeCreate = obi02IndicValuRepository.findAll().size();

        // Create the Obi02IndicValu
        restObi02IndicValuMockMvc.perform(post("/api/obi-02-indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obi02IndicValu)))
            .andExpect(status().isCreated());

        // Validate the Obi02IndicValu in the database
        List<Obi02IndicValu> obi02IndicValuList = obi02IndicValuRepository.findAll();
        assertThat(obi02IndicValuList).hasSize(databaseSizeBeforeCreate + 1);
        Obi02IndicValu testObi02IndicValu = obi02IndicValuList.get(obi02IndicValuList.size() - 1);
        assertThat(testObi02IndicValu.getTivalu()).isEqualTo(DEFAULT_TIVALU);
        assertThat(testObi02IndicValu.getNdvalinf()).isEqualTo(DEFAULT_NDVALINF);
        assertThat(testObi02IndicValu.getNdvalsup()).isEqualTo(DEFAULT_NDVALSUP);
    }

    @Test
    @Transactional
    public void createObi02IndicValuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = obi02IndicValuRepository.findAll().size();

        // Create the Obi02IndicValu with an existing ID
        obi02IndicValu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restObi02IndicValuMockMvc.perform(post("/api/obi-02-indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obi02IndicValu)))
            .andExpect(status().isBadRequest());

        // Validate the Obi02IndicValu in the database
        List<Obi02IndicValu> obi02IndicValuList = obi02IndicValuRepository.findAll();
        assertThat(obi02IndicValuList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTivaluIsRequired() throws Exception {
        int databaseSizeBeforeTest = obi02IndicValuRepository.findAll().size();
        // set the field null
        obi02IndicValu.setTivalu(null);

        // Create the Obi02IndicValu, which fails.

        restObi02IndicValuMockMvc.perform(post("/api/obi-02-indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obi02IndicValu)))
            .andExpect(status().isBadRequest());

        List<Obi02IndicValu> obi02IndicValuList = obi02IndicValuRepository.findAll();
        assertThat(obi02IndicValuList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNdvalinfIsRequired() throws Exception {
        int databaseSizeBeforeTest = obi02IndicValuRepository.findAll().size();
        // set the field null
        obi02IndicValu.setNdvalinf(null);

        // Create the Obi02IndicValu, which fails.

        restObi02IndicValuMockMvc.perform(post("/api/obi-02-indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obi02IndicValu)))
            .andExpect(status().isBadRequest());

        List<Obi02IndicValu> obi02IndicValuList = obi02IndicValuRepository.findAll();
        assertThat(obi02IndicValuList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNdvalsupIsRequired() throws Exception {
        int databaseSizeBeforeTest = obi02IndicValuRepository.findAll().size();
        // set the field null
        obi02IndicValu.setNdvalsup(null);

        // Create the Obi02IndicValu, which fails.

        restObi02IndicValuMockMvc.perform(post("/api/obi-02-indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obi02IndicValu)))
            .andExpect(status().isBadRequest());

        List<Obi02IndicValu> obi02IndicValuList = obi02IndicValuRepository.findAll();
        assertThat(obi02IndicValuList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllObi02IndicValus() throws Exception {
        // Initialize the database
        obi02IndicValuRepository.saveAndFlush(obi02IndicValu);

        // Get all the obi02IndicValuList
        restObi02IndicValuMockMvc.perform(get("/api/obi-02-indic-valus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(obi02IndicValu.getId().intValue())))
            .andExpect(jsonPath("$.[*].tivalu").value(hasItem(DEFAULT_TIVALU.doubleValue())))
            .andExpect(jsonPath("$.[*].ndvalinf").value(hasItem(DEFAULT_NDVALINF.doubleValue())))
            .andExpect(jsonPath("$.[*].ndvalsup").value(hasItem(DEFAULT_NDVALSUP.doubleValue())));
    }

    @Test
    @Transactional
    public void getObi02IndicValu() throws Exception {
        // Initialize the database
        obi02IndicValuRepository.saveAndFlush(obi02IndicValu);

        // Get the obi02IndicValu
        restObi02IndicValuMockMvc.perform(get("/api/obi-02-indic-valus/{id}", obi02IndicValu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(obi02IndicValu.getId().intValue()))
            .andExpect(jsonPath("$.tivalu").value(DEFAULT_TIVALU.doubleValue()))
            .andExpect(jsonPath("$.ndvalinf").value(DEFAULT_NDVALINF.doubleValue()))
            .andExpect(jsonPath("$.ndvalsup").value(DEFAULT_NDVALSUP.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingObi02IndicValu() throws Exception {
        // Get the obi02IndicValu
        restObi02IndicValuMockMvc.perform(get("/api/obi-02-indic-valus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateObi02IndicValu() throws Exception {
        // Initialize the database
        obi02IndicValuRepository.saveAndFlush(obi02IndicValu);
        int databaseSizeBeforeUpdate = obi02IndicValuRepository.findAll().size();

        // Update the obi02IndicValu
        Obi02IndicValu updatedObi02IndicValu = obi02IndicValuRepository.findOne(obi02IndicValu.getId());
        // Disconnect from session so that the updates on updatedObi02IndicValu are not directly saved in db
        em.detach(updatedObi02IndicValu);
        updatedObi02IndicValu
            .tivalu(UPDATED_TIVALU)
            .ndvalinf(UPDATED_NDVALINF)
            .ndvalsup(UPDATED_NDVALSUP);

        restObi02IndicValuMockMvc.perform(put("/api/obi-02-indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedObi02IndicValu)))
            .andExpect(status().isOk());

        // Validate the Obi02IndicValu in the database
        List<Obi02IndicValu> obi02IndicValuList = obi02IndicValuRepository.findAll();
        assertThat(obi02IndicValuList).hasSize(databaseSizeBeforeUpdate);
        Obi02IndicValu testObi02IndicValu = obi02IndicValuList.get(obi02IndicValuList.size() - 1);
        assertThat(testObi02IndicValu.getTivalu()).isEqualTo(UPDATED_TIVALU);
        assertThat(testObi02IndicValu.getNdvalinf()).isEqualTo(UPDATED_NDVALINF);
        assertThat(testObi02IndicValu.getNdvalsup()).isEqualTo(UPDATED_NDVALSUP);
    }

    @Test
    @Transactional
    public void updateNonExistingObi02IndicValu() throws Exception {
        int databaseSizeBeforeUpdate = obi02IndicValuRepository.findAll().size();

        // Create the Obi02IndicValu

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restObi02IndicValuMockMvc.perform(put("/api/obi-02-indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(obi02IndicValu)))
            .andExpect(status().isCreated());

        // Validate the Obi02IndicValu in the database
        List<Obi02IndicValu> obi02IndicValuList = obi02IndicValuRepository.findAll();
        assertThat(obi02IndicValuList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteObi02IndicValu() throws Exception {
        // Initialize the database
        obi02IndicValuRepository.saveAndFlush(obi02IndicValu);
        int databaseSizeBeforeDelete = obi02IndicValuRepository.findAll().size();

        // Get the obi02IndicValu
        restObi02IndicValuMockMvc.perform(delete("/api/obi-02-indic-valus/{id}", obi02IndicValu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Obi02IndicValu> obi02IndicValuList = obi02IndicValuRepository.findAll();
        assertThat(obi02IndicValuList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Obi02IndicValu.class);
        Obi02IndicValu obi02IndicValu1 = new Obi02IndicValu();
        obi02IndicValu1.setId(1L);
        Obi02IndicValu obi02IndicValu2 = new Obi02IndicValu();
        obi02IndicValu2.setId(obi02IndicValu1.getId());
        assertThat(obi02IndicValu1).isEqualTo(obi02IndicValu2);
        obi02IndicValu2.setId(2L);
        assertThat(obi02IndicValu1).isNotEqualTo(obi02IndicValu2);
        obi02IndicValu1.setId(null);
        assertThat(obi02IndicValu1).isNotEqualTo(obi02IndicValu2);
    }
}
