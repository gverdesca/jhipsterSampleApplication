package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Ba01Utente;
import io.github.jhipster.application.repository.Ba01UtenteRepository;
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
 * Test class for the Ba01UtenteResource REST controller.
 *
 * @see Ba01UtenteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class Ba01UtenteResourceIntTest {

    private static final String DEFAULT_NM_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NM_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_CD_COD = "AAAAAAAAAA";
    private static final String UPDATED_CD_COD = "BBBBBBBBBB";

    @Autowired
    private Ba01UtenteRepository ba01UtenteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBa01UtenteMockMvc;

    private Ba01Utente ba01Utente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Ba01UtenteResource ba01UtenteResource = new Ba01UtenteResource(ba01UtenteRepository);
        this.restBa01UtenteMockMvc = MockMvcBuilders.standaloneSetup(ba01UtenteResource)
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
    public static Ba01Utente createEntity(EntityManager em) {
        Ba01Utente ba01Utente = new Ba01Utente()
            .nmNome(DEFAULT_NM_NOME)
            .cdCod(DEFAULT_CD_COD);
        return ba01Utente;
    }

    @Before
    public void initTest() {
        ba01Utente = createEntity(em);
    }

    @Test
    @Transactional
    public void createBa01Utente() throws Exception {
        int databaseSizeBeforeCreate = ba01UtenteRepository.findAll().size();

        // Create the Ba01Utente
        restBa01UtenteMockMvc.perform(post("/api/ba-01-utentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba01Utente)))
            .andExpect(status().isCreated());

        // Validate the Ba01Utente in the database
        List<Ba01Utente> ba01UtenteList = ba01UtenteRepository.findAll();
        assertThat(ba01UtenteList).hasSize(databaseSizeBeforeCreate + 1);
        Ba01Utente testBa01Utente = ba01UtenteList.get(ba01UtenteList.size() - 1);
        assertThat(testBa01Utente.getNmNome()).isEqualTo(DEFAULT_NM_NOME);
        assertThat(testBa01Utente.getCdCod()).isEqualTo(DEFAULT_CD_COD);
    }

    @Test
    @Transactional
    public void createBa01UtenteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ba01UtenteRepository.findAll().size();

        // Create the Ba01Utente with an existing ID
        ba01Utente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBa01UtenteMockMvc.perform(post("/api/ba-01-utentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba01Utente)))
            .andExpect(status().isBadRequest());

        // Validate the Ba01Utente in the database
        List<Ba01Utente> ba01UtenteList = ba01UtenteRepository.findAll();
        assertThat(ba01UtenteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBa01Utentes() throws Exception {
        // Initialize the database
        ba01UtenteRepository.saveAndFlush(ba01Utente);

        // Get all the ba01UtenteList
        restBa01UtenteMockMvc.perform(get("/api/ba-01-utentes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ba01Utente.getId().intValue())))
            .andExpect(jsonPath("$.[*].nmNome").value(hasItem(DEFAULT_NM_NOME.toString())))
            .andExpect(jsonPath("$.[*].cdCod").value(hasItem(DEFAULT_CD_COD.toString())));
    }

    @Test
    @Transactional
    public void getBa01Utente() throws Exception {
        // Initialize the database
        ba01UtenteRepository.saveAndFlush(ba01Utente);

        // Get the ba01Utente
        restBa01UtenteMockMvc.perform(get("/api/ba-01-utentes/{id}", ba01Utente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ba01Utente.getId().intValue()))
            .andExpect(jsonPath("$.nmNome").value(DEFAULT_NM_NOME.toString()))
            .andExpect(jsonPath("$.cdCod").value(DEFAULT_CD_COD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBa01Utente() throws Exception {
        // Get the ba01Utente
        restBa01UtenteMockMvc.perform(get("/api/ba-01-utentes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBa01Utente() throws Exception {
        // Initialize the database
        ba01UtenteRepository.saveAndFlush(ba01Utente);
        int databaseSizeBeforeUpdate = ba01UtenteRepository.findAll().size();

        // Update the ba01Utente
        Ba01Utente updatedBa01Utente = ba01UtenteRepository.findOne(ba01Utente.getId());
        // Disconnect from session so that the updates on updatedBa01Utente are not directly saved in db
        em.detach(updatedBa01Utente);
        updatedBa01Utente
            .nmNome(UPDATED_NM_NOME)
            .cdCod(UPDATED_CD_COD);

        restBa01UtenteMockMvc.perform(put("/api/ba-01-utentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBa01Utente)))
            .andExpect(status().isOk());

        // Validate the Ba01Utente in the database
        List<Ba01Utente> ba01UtenteList = ba01UtenteRepository.findAll();
        assertThat(ba01UtenteList).hasSize(databaseSizeBeforeUpdate);
        Ba01Utente testBa01Utente = ba01UtenteList.get(ba01UtenteList.size() - 1);
        assertThat(testBa01Utente.getNmNome()).isEqualTo(UPDATED_NM_NOME);
        assertThat(testBa01Utente.getCdCod()).isEqualTo(UPDATED_CD_COD);
    }

    @Test
    @Transactional
    public void updateNonExistingBa01Utente() throws Exception {
        int databaseSizeBeforeUpdate = ba01UtenteRepository.findAll().size();

        // Create the Ba01Utente

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBa01UtenteMockMvc.perform(put("/api/ba-01-utentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba01Utente)))
            .andExpect(status().isCreated());

        // Validate the Ba01Utente in the database
        List<Ba01Utente> ba01UtenteList = ba01UtenteRepository.findAll();
        assertThat(ba01UtenteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBa01Utente() throws Exception {
        // Initialize the database
        ba01UtenteRepository.saveAndFlush(ba01Utente);
        int databaseSizeBeforeDelete = ba01UtenteRepository.findAll().size();

        // Get the ba01Utente
        restBa01UtenteMockMvc.perform(delete("/api/ba-01-utentes/{id}", ba01Utente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ba01Utente> ba01UtenteList = ba01UtenteRepository.findAll();
        assertThat(ba01UtenteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ba01Utente.class);
        Ba01Utente ba01Utente1 = new Ba01Utente();
        ba01Utente1.setId(1L);
        Ba01Utente ba01Utente2 = new Ba01Utente();
        ba01Utente2.setId(ba01Utente1.getId());
        assertThat(ba01Utente1).isEqualTo(ba01Utente2);
        ba01Utente2.setId(2L);
        assertThat(ba01Utente1).isNotEqualTo(ba01Utente2);
        ba01Utente1.setId(null);
        assertThat(ba01Utente1).isNotEqualTo(ba01Utente2);
    }
}
