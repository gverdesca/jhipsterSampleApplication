package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Ba11Dsh;
import io.github.jhipster.application.repository.Ba11DshRepository;
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
 * Test class for the Ba11DshResource REST controller.
 *
 * @see Ba11DshResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class Ba11DshResourceIntTest {

    private static final String DEFAULT_DB_TITOLO = "AAAAAAAAAA";
    private static final String UPDATED_DB_TITOLO = "BBBBBBBBBB";

    private static final String DEFAULT_DE_DESC = "AAAAAAAAAA";
    private static final String UPDATED_DE_DESC = "BBBBBBBBBB";

    private static final String DEFAULT_DE_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_DE_CONTENT = "BBBBBBBBBB";

    @Autowired
    private Ba11DshRepository ba11DshRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBa11DshMockMvc;

    private Ba11Dsh ba11Dsh;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Ba11DshResource ba11DshResource = new Ba11DshResource(ba11DshRepository);
        this.restBa11DshMockMvc = MockMvcBuilders.standaloneSetup(ba11DshResource)
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
    public static Ba11Dsh createEntity(EntityManager em) {
        Ba11Dsh ba11Dsh = new Ba11Dsh()
            .dbTitolo(DEFAULT_DB_TITOLO)
            .deDesc(DEFAULT_DE_DESC)
            .deContent(DEFAULT_DE_CONTENT);
        return ba11Dsh;
    }

    @Before
    public void initTest() {
        ba11Dsh = createEntity(em);
    }

    @Test
    @Transactional
    public void createBa11Dsh() throws Exception {
        int databaseSizeBeforeCreate = ba11DshRepository.findAll().size();

        // Create the Ba11Dsh
        restBa11DshMockMvc.perform(post("/api/ba-11-dshes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba11Dsh)))
            .andExpect(status().isCreated());

        // Validate the Ba11Dsh in the database
        List<Ba11Dsh> ba11DshList = ba11DshRepository.findAll();
        assertThat(ba11DshList).hasSize(databaseSizeBeforeCreate + 1);
        Ba11Dsh testBa11Dsh = ba11DshList.get(ba11DshList.size() - 1);
        assertThat(testBa11Dsh.getDbTitolo()).isEqualTo(DEFAULT_DB_TITOLO);
        assertThat(testBa11Dsh.getDeDesc()).isEqualTo(DEFAULT_DE_DESC);
        assertThat(testBa11Dsh.getDeContent()).isEqualTo(DEFAULT_DE_CONTENT);
    }

    @Test
    @Transactional
    public void createBa11DshWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ba11DshRepository.findAll().size();

        // Create the Ba11Dsh with an existing ID
        ba11Dsh.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBa11DshMockMvc.perform(post("/api/ba-11-dshes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba11Dsh)))
            .andExpect(status().isBadRequest());

        // Validate the Ba11Dsh in the database
        List<Ba11Dsh> ba11DshList = ba11DshRepository.findAll();
        assertThat(ba11DshList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBa11Dshes() throws Exception {
        // Initialize the database
        ba11DshRepository.saveAndFlush(ba11Dsh);

        // Get all the ba11DshList
        restBa11DshMockMvc.perform(get("/api/ba-11-dshes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ba11Dsh.getId().intValue())))
            .andExpect(jsonPath("$.[*].dbTitolo").value(hasItem(DEFAULT_DB_TITOLO.toString())))
            .andExpect(jsonPath("$.[*].deDesc").value(hasItem(DEFAULT_DE_DESC.toString())))
            .andExpect(jsonPath("$.[*].deContent").value(hasItem(DEFAULT_DE_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void getBa11Dsh() throws Exception {
        // Initialize the database
        ba11DshRepository.saveAndFlush(ba11Dsh);

        // Get the ba11Dsh
        restBa11DshMockMvc.perform(get("/api/ba-11-dshes/{id}", ba11Dsh.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ba11Dsh.getId().intValue()))
            .andExpect(jsonPath("$.dbTitolo").value(DEFAULT_DB_TITOLO.toString()))
            .andExpect(jsonPath("$.deDesc").value(DEFAULT_DE_DESC.toString()))
            .andExpect(jsonPath("$.deContent").value(DEFAULT_DE_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBa11Dsh() throws Exception {
        // Get the ba11Dsh
        restBa11DshMockMvc.perform(get("/api/ba-11-dshes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBa11Dsh() throws Exception {
        // Initialize the database
        ba11DshRepository.saveAndFlush(ba11Dsh);
        int databaseSizeBeforeUpdate = ba11DshRepository.findAll().size();

        // Update the ba11Dsh
        Ba11Dsh updatedBa11Dsh = ba11DshRepository.findOne(ba11Dsh.getId());
        // Disconnect from session so that the updates on updatedBa11Dsh are not directly saved in db
        em.detach(updatedBa11Dsh);
        updatedBa11Dsh
            .dbTitolo(UPDATED_DB_TITOLO)
            .deDesc(UPDATED_DE_DESC)
            .deContent(UPDATED_DE_CONTENT);

        restBa11DshMockMvc.perform(put("/api/ba-11-dshes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBa11Dsh)))
            .andExpect(status().isOk());

        // Validate the Ba11Dsh in the database
        List<Ba11Dsh> ba11DshList = ba11DshRepository.findAll();
        assertThat(ba11DshList).hasSize(databaseSizeBeforeUpdate);
        Ba11Dsh testBa11Dsh = ba11DshList.get(ba11DshList.size() - 1);
        assertThat(testBa11Dsh.getDbTitolo()).isEqualTo(UPDATED_DB_TITOLO);
        assertThat(testBa11Dsh.getDeDesc()).isEqualTo(UPDATED_DE_DESC);
        assertThat(testBa11Dsh.getDeContent()).isEqualTo(UPDATED_DE_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingBa11Dsh() throws Exception {
        int databaseSizeBeforeUpdate = ba11DshRepository.findAll().size();

        // Create the Ba11Dsh

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBa11DshMockMvc.perform(put("/api/ba-11-dshes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba11Dsh)))
            .andExpect(status().isCreated());

        // Validate the Ba11Dsh in the database
        List<Ba11Dsh> ba11DshList = ba11DshRepository.findAll();
        assertThat(ba11DshList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBa11Dsh() throws Exception {
        // Initialize the database
        ba11DshRepository.saveAndFlush(ba11Dsh);
        int databaseSizeBeforeDelete = ba11DshRepository.findAll().size();

        // Get the ba11Dsh
        restBa11DshMockMvc.perform(delete("/api/ba-11-dshes/{id}", ba11Dsh.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ba11Dsh> ba11DshList = ba11DshRepository.findAll();
        assertThat(ba11DshList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ba11Dsh.class);
        Ba11Dsh ba11Dsh1 = new Ba11Dsh();
        ba11Dsh1.setId(1L);
        Ba11Dsh ba11Dsh2 = new Ba11Dsh();
        ba11Dsh2.setId(ba11Dsh1.getId());
        assertThat(ba11Dsh1).isEqualTo(ba11Dsh2);
        ba11Dsh2.setId(2L);
        assertThat(ba11Dsh1).isNotEqualTo(ba11Dsh2);
        ba11Dsh1.setId(null);
        assertThat(ba11Dsh1).isNotEqualTo(ba11Dsh2);
    }
}
