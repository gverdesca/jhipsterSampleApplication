package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Ba00Entita;
import io.github.jhipster.application.repository.Ba00EntitaRepository;
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
 * Test class for the Ba00EntitaResource REST controller.
 *
 * @see Ba00EntitaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class Ba00EntitaResourceIntTest {

    private static final String DEFAULT_NM_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NM_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_CD_COD = "AAAAAAAAAA";
    private static final String UPDATED_CD_COD = "BBBBBBBBBB";

    @Autowired
    private Ba00EntitaRepository ba00EntitaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBa00EntitaMockMvc;

    private Ba00Entita ba00Entita;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Ba00EntitaResource ba00EntitaResource = new Ba00EntitaResource(ba00EntitaRepository);
        this.restBa00EntitaMockMvc = MockMvcBuilders.standaloneSetup(ba00EntitaResource)
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
    public static Ba00Entita createEntity(EntityManager em) {
        Ba00Entita ba00Entita = new Ba00Entita()
            .nmNome(DEFAULT_NM_NOME)
            .cdCod(DEFAULT_CD_COD);
        return ba00Entita;
    }

    @Before
    public void initTest() {
        ba00Entita = createEntity(em);
    }

    @Test
    @Transactional
    public void createBa00Entita() throws Exception {
        int databaseSizeBeforeCreate = ba00EntitaRepository.findAll().size();

        // Create the Ba00Entita
        restBa00EntitaMockMvc.perform(post("/api/ba-00-entitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba00Entita)))
            .andExpect(status().isCreated());

        // Validate the Ba00Entita in the database
        List<Ba00Entita> ba00EntitaList = ba00EntitaRepository.findAll();
        assertThat(ba00EntitaList).hasSize(databaseSizeBeforeCreate + 1);
        Ba00Entita testBa00Entita = ba00EntitaList.get(ba00EntitaList.size() - 1);
        assertThat(testBa00Entita.getNmNome()).isEqualTo(DEFAULT_NM_NOME);
        assertThat(testBa00Entita.getCdCod()).isEqualTo(DEFAULT_CD_COD);
    }

    @Test
    @Transactional
    public void createBa00EntitaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ba00EntitaRepository.findAll().size();

        // Create the Ba00Entita with an existing ID
        ba00Entita.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBa00EntitaMockMvc.perform(post("/api/ba-00-entitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba00Entita)))
            .andExpect(status().isBadRequest());

        // Validate the Ba00Entita in the database
        List<Ba00Entita> ba00EntitaList = ba00EntitaRepository.findAll();
        assertThat(ba00EntitaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCdCodIsRequired() throws Exception {
        int databaseSizeBeforeTest = ba00EntitaRepository.findAll().size();
        // set the field null
        ba00Entita.setCdCod(null);

        // Create the Ba00Entita, which fails.

        restBa00EntitaMockMvc.perform(post("/api/ba-00-entitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba00Entita)))
            .andExpect(status().isBadRequest());

        List<Ba00Entita> ba00EntitaList = ba00EntitaRepository.findAll();
        assertThat(ba00EntitaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBa00Entitas() throws Exception {
        // Initialize the database
        ba00EntitaRepository.saveAndFlush(ba00Entita);

        // Get all the ba00EntitaList
        restBa00EntitaMockMvc.perform(get("/api/ba-00-entitas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ba00Entita.getId().intValue())))
            .andExpect(jsonPath("$.[*].nmNome").value(hasItem(DEFAULT_NM_NOME.toString())))
            .andExpect(jsonPath("$.[*].cdCod").value(hasItem(DEFAULT_CD_COD.toString())));
    }

    @Test
    @Transactional
    public void getBa00Entita() throws Exception {
        // Initialize the database
        ba00EntitaRepository.saveAndFlush(ba00Entita);

        // Get the ba00Entita
        restBa00EntitaMockMvc.perform(get("/api/ba-00-entitas/{id}", ba00Entita.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ba00Entita.getId().intValue()))
            .andExpect(jsonPath("$.nmNome").value(DEFAULT_NM_NOME.toString()))
            .andExpect(jsonPath("$.cdCod").value(DEFAULT_CD_COD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBa00Entita() throws Exception {
        // Get the ba00Entita
        restBa00EntitaMockMvc.perform(get("/api/ba-00-entitas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBa00Entita() throws Exception {
        // Initialize the database
        ba00EntitaRepository.saveAndFlush(ba00Entita);
        int databaseSizeBeforeUpdate = ba00EntitaRepository.findAll().size();

        // Update the ba00Entita
        Ba00Entita updatedBa00Entita = ba00EntitaRepository.findOne(ba00Entita.getId());
        // Disconnect from session so that the updates on updatedBa00Entita are not directly saved in db
        em.detach(updatedBa00Entita);
        updatedBa00Entita
            .nmNome(UPDATED_NM_NOME)
            .cdCod(UPDATED_CD_COD);

        restBa00EntitaMockMvc.perform(put("/api/ba-00-entitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBa00Entita)))
            .andExpect(status().isOk());

        // Validate the Ba00Entita in the database
        List<Ba00Entita> ba00EntitaList = ba00EntitaRepository.findAll();
        assertThat(ba00EntitaList).hasSize(databaseSizeBeforeUpdate);
        Ba00Entita testBa00Entita = ba00EntitaList.get(ba00EntitaList.size() - 1);
        assertThat(testBa00Entita.getNmNome()).isEqualTo(UPDATED_NM_NOME);
        assertThat(testBa00Entita.getCdCod()).isEqualTo(UPDATED_CD_COD);
    }

    @Test
    @Transactional
    public void updateNonExistingBa00Entita() throws Exception {
        int databaseSizeBeforeUpdate = ba00EntitaRepository.findAll().size();

        // Create the Ba00Entita

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBa00EntitaMockMvc.perform(put("/api/ba-00-entitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba00Entita)))
            .andExpect(status().isCreated());

        // Validate the Ba00Entita in the database
        List<Ba00Entita> ba00EntitaList = ba00EntitaRepository.findAll();
        assertThat(ba00EntitaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBa00Entita() throws Exception {
        // Initialize the database
        ba00EntitaRepository.saveAndFlush(ba00Entita);
        int databaseSizeBeforeDelete = ba00EntitaRepository.findAll().size();

        // Get the ba00Entita
        restBa00EntitaMockMvc.perform(delete("/api/ba-00-entitas/{id}", ba00Entita.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ba00Entita> ba00EntitaList = ba00EntitaRepository.findAll();
        assertThat(ba00EntitaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ba00Entita.class);
        Ba00Entita ba00Entita1 = new Ba00Entita();
        ba00Entita1.setId(1L);
        Ba00Entita ba00Entita2 = new Ba00Entita();
        ba00Entita2.setId(ba00Entita1.getId());
        assertThat(ba00Entita1).isEqualTo(ba00Entita2);
        ba00Entita2.setId(2L);
        assertThat(ba00Entita1).isNotEqualTo(ba00Entita2);
        ba00Entita1.setId(null);
        assertThat(ba00Entita1).isNotEqualTo(ba00Entita2);
    }
}
